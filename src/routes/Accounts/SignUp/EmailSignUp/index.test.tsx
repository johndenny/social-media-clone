import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { CombinedError, Provider } from "urql";
import { never, fromValue } from "wonka";
import { EmailSignUp } from ".";
import GlobalContext from "../../../../context/GlobalContext";

const mockReexecute = jest.fn();
const mockSetFooterMessage = jest.fn();
const mockContext = {
  reexecuteQuery: mockReexecute,
  setFooterMessage: mockSetFooterMessage,
  currentUser: null,
} as any;

const mockClientFetch = {
  executeMutation: () => never,
  executeQuery: () =>
    fromValue({
      data: {
        checkUsername: false,
      },
    }),
} as any;

const mockClientError = {
  executeMutation: () =>
    fromValue({
      error: new CombinedError({
        graphQLErrors: [{ message: "test error!!!" }],
      }),
    }),
  executeQuery: () =>
    fromValue({
      data: {
        checkUsername: true,
      },
    }),
} as any;

const mockClientSuccess = {
  executeMutation: () => fromValue({ data: true }),
  executeQuery: () => fromValue({ data: { checkUsername: false } }),
} as any;

const mockSetEmail = jest.fn();
const MockSignUp = () => (
  <Outlet context={{ setEmail: mockSetEmail, email: "test@test.com" }} />
);

test("should render elements", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientFetch}>
        <Routes>
          <Route path="/" element={<MockSignUp />}>
            <Route path="/" element={<EmailSignUp />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByAltText("Instagram")).toBeInTheDocument();
  expect(
    screen.getByText("Sign up to see photos and videos from your friends.")
  ).toBeInTheDocument();
  expect(screen.getByRole("form")).toBeInTheDocument();
  const buttons = screen.getAllByRole("button");
  expect(buttons[0]).toHaveTextContent("Continue with Facebook");
  expect(screen.getByText("OR")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toHaveFocus();
  expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(buttons[1]).toHaveTextContent("Sign Up");
  expect(buttons[1]).toHaveAttribute("disabled");
  const link = screen.getByRole("link");
  expect(link).toHaveTextContent("Back To Login");
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Your password must be at least 8 characters and include a number, letter, capital letter and special character (!$@%)."
  );
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "tester" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "!Aa12345" },
  });
  fireEvent.click(buttons[1]);
  await waitFor(() => {
    expect(screen.getAllByRole("button")[2]).toContainElement(
      screen.getByAltText("Loading...")
    );
  });
});

test("should show errors", async () => {
  jest.useFakeTimers();
  render(
    <BrowserRouter>
      <Provider value={mockClientError}>
        <Routes>
          <Route path="/" element={<MockSignUp />}>
            <Route path="/" element={<EmailSignUp />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );

  // Email
  const emailTextbox = screen.getByLabelText("Email");
  fireEvent.change(emailTextbox, {
    target: { value: "test@tes" },
  });
  fireEvent.blur(emailTextbox);
  expect(screen.getAllByRole("alert")[0]).toHaveTextContent(
    "Please enter a valid email."
  );
  fireEvent.focus(emailTextbox);
  expect(screen.getByRole("alert")).toBeInTheDocument();

  // Full Name
  const fullNameTextbox = screen.getByLabelText("Full Name");
  fireEvent.change(fullNameTextbox, {
    target: {
      value: "asdf asdfads fadf",
    },
  });
  expect(screen.getAllByRole("alert")[0]).toHaveTextContent(
    "Your full name cannot exceed 30 characters including one space."
  );
  fireEvent.focus(fullNameTextbox);
  expect(screen.getByRole("alert")).toBeInTheDocument();

  //username
  const usernameTextbox = screen.getByLabelText("Username");
  fireEvent.change(usernameTextbox, {
    target: {
      value: "asdfasdf",
    },
  });
  act(() => {
    jest.advanceTimersByTime(1001);
  });
  await waitFor(() => {
    expect(screen.getAllByRole("alert")[0]).toHaveTextContent(
      "This username is already being used"
    );
  });
  fireEvent.change(usernameTextbox, {
    target: {
      value: "as",
    },
  });
  expect(screen.getAllByRole("alert")[0]).toHaveTextContent(
    "Your username must only have between 3 and 30 letters, numbers, periods or underscores."
  );
  fireEvent.change(usernameTextbox, {
    target: {
      value: "",
    },
  });
  expect(screen.getAllByRole("alert")[0]).toHaveTextContent(
    "Please enter a username"
  );
  fireEvent.focus(usernameTextbox);
  expect(screen.getByRole("alert")).toBeInTheDocument();

  //password
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
});

test("successful response renders confirm email component", async () => {
  jest.useFakeTimers();
  render(
    <BrowserRouter>
      <Provider value={mockClientSuccess}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Routes>
            <Route path="/" element={<MockSignUp />}>
              <Route path="/" element={<EmailSignUp />} />
            </Route>
          </Routes>
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "tester" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "!Aa12345" },
  });
  fireEvent.click(screen.getByText("Sign Up"));
  act(() => {
    jest.advanceTimersByTime(1001);
  });
  await waitFor(() => {
    expect(mockSetEmail).toBeCalledTimes(1);
  });
  expect(screen.queryByAltText("Instagram")).not.toBeInTheDocument();
  expect(
    screen.queryByText("Sign up to see photos and videos from your friends.")
  ).not.toBeInTheDocument();
  const buttons = screen.queryAllByRole("button");
  expect(buttons[0]).not.toHaveTextContent("Continue with Facebook");
  expect(screen.queryByText("OR")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Full Name")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Username")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();
  expect(buttons[1]).not.toHaveTextContent("Sign Up");

  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Enter Confirmation Code"
  );
  expect(
    screen.getByText("Enter the confirmation code we sent to test@test.com")
  ).toContainElement(screen.getByText("Resend Code"));
  expect(screen.getByRole("form")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "tel");
  const button = screen.getByText("Next");
  expect(button).toHaveAttribute("disabled");
});
