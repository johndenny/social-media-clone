import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { CombinedError, Provider } from "urql";
import { fromValue, never } from "wonka";
import { ConfirmEmail } from ".";
import GlobalContext from "../../../../context/GlobalContext";
import * as tokenHandlers from "../../../../utils/accessToken";
import { ValidateValues } from "../../../../hooks/useForm";

const MockSignUp = () => <Outlet context={{ email: "test@test.com" }} />;

const mockReexecuteViewerQuery = jest.fn();
const mockSetFooterMessage = jest.fn();
const mockContext = {
  reexecuteViewerQuery: mockReexecuteViewerQuery,
  setFooterMessage: mockSetFooterMessage,
  currentUser: null,
} as any;

const mockClient = {
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

const mockSignUpSuccess = {
  executeMutation: () =>
    fromValue({
      data: {
        signup: {
          accessToken: "sadf8af89sf",
        },
      },
    }),
} as any;

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("should render elements and validate code, fetching response reveals spinner in button", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClient}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Routes>
            <Route path="/" element={<MockSignUp />}>
              <Route path="/" element={<ConfirmEmail />} />
            </Route>
          </Routes>
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Enter Confirmation Code"
  );
  expect(
    screen.getByText("Enter the confirmation code we sent to test@test.com")
  ).toContainElement(screen.getByText("Resend Code"));
  expect(screen.getByRole("form")).toBeInTheDocument();
  const textbox = screen.getByRole("textbox");
  expect(textbox).toHaveFocus();
  expect(textbox).toHaveAttribute("type", "tel");
  const button = screen.getByText("Next");
  expect(button).toHaveAttribute("disabled");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  fireEvent.change(textbox, {
    target: { value: "asdfasdf!" },
  });
  fireEvent.blur(textbox);
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Please enter a passcode"
  );
  fireEvent.change(textbox, {
    target: { value: "123" },
  });
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Please enter a valid passcode"
  );
  fireEvent.change(textbox, {
    target: { value: "123456" },
  });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(button).not.toHaveAttribute("disabled");
  fireEvent.click(button);
  await waitFor(() => {
    expect(button).toContainElement(screen.getByRole("img"));
  });
  expect(screen.queryByText("Next")).not.toBeInTheDocument();
});

test("client error should display errors", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientError}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Routes>
            <Route path="/" element={<MockSignUp />}>
              <Route path="/" element={<ConfirmEmail />} />
            </Route>
          </Routes>
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Resend Code"));
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "123456" },
  });
  fireEvent.click(screen.getByText("Next"));
  fireEvent.blur(screen.getByRole("textbox"));
  await waitFor(() => {
    expect(screen.getByText("test error!!!")).toBeInTheDocument();
  });
  expect(mockSetFooterMessage).toHaveBeenCalledWith("test error!!!");
});

test("successful response without passsed values should navigate", async () => {
  const mutationSpy = jest.spyOn(mockClientSuccess, "executeMutation");
  render(
    <BrowserRouter>
      <Provider value={mockClientSuccess}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Routes>
            <Route path="/" element={<MockSignUp />}>
              <Route path="/" element={<ConfirmEmail />} />
            </Route>
          </Routes>
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "123456" },
  });
  fireEvent.click(screen.getByText("Next"));
  await waitFor(() => {
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
  const variables = { email: "test@test.com", passcode: 123456 };
  expect(mutationSpy).toBeCalledWith(
    expect.objectContaining({ variables }),
    {}
  );
});

test("successful response with passed values should send signup mutation", async () => {
  const tokenSpy = jest.spyOn(tokenHandlers, "setAccessToken");
  const signUpSpy = jest.spyOn(mockSignUpSuccess, "executeMutation");
  render(
    <BrowserRouter>
      <Provider value={mockSignUpSuccess}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Routes>
            <Route path="/" element={<MockSignUp />}>
              <Route
                path="/"
                element={<ConfirmEmail passedValues={true as ValidateValues} />}
              />
            </Route>
          </Routes>
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "123456" },
  });
  fireEvent.click(screen.getByText("Next"));
  await waitFor(() => {
    expect(tokenSpy).toBeCalledWith("sadf8af89sf");
  });
  expect(mockReexecuteViewerQuery).toHaveBeenCalledTimes(1);
  expect(signUpSpy).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({
      variables: { email: "test@test.com", passcode: 123456 },
    }),
    {}
  );
  expect(signUpSpy).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({
      variables: true,
    }),
    {}
  );
});
