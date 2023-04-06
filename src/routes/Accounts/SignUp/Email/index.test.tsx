import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { CombinedError, Provider } from "urql";
import { never, fromValue } from "wonka";
import { Email } from ".";

const mockClientFetch = {
  executeMutation: () => never,
} as any;

const mockClientError = {
  executeMutation: () =>
    fromValue({
      error: new CombinedError({
        graphQLErrors: [{ message: "test error!!!" }],
      }),
    }),
} as any;

const mockClientSuccess = {
  executeMutation: () =>
    fromValue({
      data: "HELLO!",
    }),
} as any;

const mockSetEmail = jest.fn();
const MockSignUp = () => (
  <Outlet context={{ email: "test@test.com", setEmail: mockSetEmail }} />
);
const MockSignUpNull = () => <Outlet context={{ email: "" }} />;

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("should render elements and set email value", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientFetch}>
        <Routes>
          <Route path="/" element={<MockSignUp />}>
            <Route path="/" element={<Email />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  expect(input).toHaveFocus();
  expect(input).toHaveAttribute("value", "test@test.com");
  expect(screen.getByRole("form")).toBeInTheDocument();
  expect(button).not.toHaveAttribute("disabled");
  expect(button).toHaveTextContent("Next");
  fireEvent.click(button);
  await waitFor(() => {
    expect(button).toContainElement(screen.getByRole("img"));
  });
});

test("should show errors", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientError}>
        <Routes>
          <Route path="/" element={<MockSignUpNull />}>
            <Route path="/" element={<Email />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
  const textbox = screen.getByRole("textbox");
  fireEvent.change(textbox, {
    target: { value: "asdfasdf!" },
  });
  fireEvent.blur(textbox);
  const alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent("Please enter a valid email");
  fireEvent.change(textbox, {
    target: { value: "" },
  });
  expect(alert).toHaveTextContent("Please enter a email");
  fireEvent.change(textbox, {
    target: { value: "test@test.com" },
  });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent("test error!!!");
  });
  expect(screen.getByRole("button")).toHaveAttribute("disabled");
});

test("successful response", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientSuccess}>
        <Routes>
          <Route path="/" element={<MockSignUp />}>
            <Route path="/" element={<Email />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(mockSetEmail).toBeCalledWith("test@test.com");
  });
  expect(mockUsedNavigate).toBeCalledWith("/accounts/signup/emailConfirmation");
});
