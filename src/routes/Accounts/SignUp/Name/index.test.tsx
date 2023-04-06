import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { CombinedError, Provider } from "urql";
import { never, fromValue } from "wonka";
import { Name } from ".";
import GlobalContext from "../../../../context/GlobalContext";
import * as tokenHandler from "../../../../utils/accessToken";

const mockSetFooterMessage = jest.fn();
const mockContext = {
  setFooterMessage: mockSetFooterMessage,
  currentUser: null,
} as any;

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
      data: {
        signup: {
          accessToken: "sadf8af89sf",
        },
      },
    }),
} as any;

const MockSignUp = () => <Outlet context={{ email: "test@test.com" }} />;

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("should render elements, should render spinner when fetching", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientFetch}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Routes>
            <Route path="/" element={<MockSignUp />}>
              <Route path="/" element={<Name />} />
            </Route>
          </Routes>
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  expect(mockUsedNavigate).toBeCalledTimes(0);
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Enter name and password"
  );
  expect(
    screen.getByText("Add your name so friends can find you.")
  ).toBeInTheDocument();
  expect(screen.getByRole("form")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveFocus();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Your password must be at least 8 characters and include a number, letter, capital letter and special character (!$@%)."
  );
  expect(screen.getByRole("button")).toHaveAttribute("disabled");
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "!Aa12345" },
  });
  fireEvent.click(screen.getByText("Next"));
  await waitFor(() => {
    expect(screen.getAllByRole("button")[1]).toContainElement(
      screen.getByRole("img")
    );
  });
});

test("should show errors", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientError}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Routes>
            <Route path="/" element={<MockSignUp />}>
              <Route path="/" element={<Name />} />
            </Route>
          </Routes>
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  // Full Name
  const fullNameTextbox = screen.getByLabelText("Full Name");
  fireEvent.change(fullNameTextbox, {
    target: {
      value: "asdf asddfsdfsfdsfsddfsdfsafads fadf",
    },
  });
  fireEvent.blur(fullNameTextbox);
  expect(screen.getAllByRole("alert")[0]).toHaveTextContent(
    "Your full name cannot exceed 30 characters including one space."
  );
  fireEvent.focus(fullNameTextbox);
  expect(screen.getByRole("alert")).toBeInTheDocument();

  // Password
  const passwordTextbox = screen.getByLabelText("Password");
  fireEvent.change(passwordTextbox, {
    target: {
      value: "123",
    },
  });
  fireEvent.focus(passwordTextbox);
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Your password must be at least 8 characters and include a number, letter, capital letter and special character (!$@%)."
  );
  fireEvent.change(passwordTextbox, {
    target: {
      value: "!Aa12345",
    },
  });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  fireEvent.change(fullNameTextbox, {
    target: {
      value: "test",
    },
  });
  fireEvent.blur(fullNameTextbox);
  expect(screen.getByText("Next")).not.toHaveAttribute("disabled");
  fireEvent.click(screen.getByText("Next"));
  await waitFor(() => {
    expect(mockSetFooterMessage).toBeCalledWith("test error!!!");
  });
});

test("successful response should get token and navigate", async () => {
  const spy = jest.spyOn(tokenHandler, "setAccessToken");
  render(
    <BrowserRouter>
      <Provider value={mockClientSuccess}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Routes>
            <Route path="/" element={<MockSignUp />}>
              <Route path="/" element={<Name />} />
            </Route>
          </Routes>
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: {
      value: "test",
    },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: {
      value: "!Aa12345",
    },
  });
  fireEvent.click(screen.getByText("Next"));
  await waitFor(() => {
    expect(spy).toBeCalledWith("sadf8af89sf");
  });
  expect(mockUsedNavigate).toBeCalledWith("/accounts/signup/username");
});
