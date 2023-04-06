import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { CombinedError, Provider } from "urql";
import { never, fromValue } from "wonka";
import { Login } from ".";
import GlobalContext from "../../../context/GlobalContext";
import * as tokenHandlers from "../../../utils/accessToken";
import { createMemoryHistory } from "history";

const mockSetHeaderAttrs = jest.fn();

test("should set title, render two buttons, one textbox, one password input", () => {
  const mockClient = {
    executeQuery: jest.fn(),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(),
  } as any;
  render(
    <GlobalContext.Provider
      value={{ isMobile: false, setHeaderAttrs: mockSetHeaderAttrs } as any}
    >
      <Provider value={mockClient}>
        <Login />
      </Provider>
    </GlobalContext.Provider>,
    { wrapper: MemoryRouter }
  );
  expect(mockSetHeaderAttrs).toBeCalledWith({});
  expect(document.title).toBe("Login • Instagram");
  expect(screen.getAllByRole("button")).toHaveLength(2);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getAllByRole("link")).toHaveLength(2);
  expect(screen.getByAltText("Instagram")).toBeInTheDocument();
  expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  expect(screen.getByText("OR")).toBeInTheDocument();
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "TEST!" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "TEST!" },
  });
  fireEvent.click(screen.getByText("Log In"));
  expect(mockClient.executeMutation).toBeCalledTimes(1);
});

test("error response should show error message, then removed on input change", async () => {
  const errorState = {
    executeMutation: () =>
      fromValue({
        error: new CombinedError({
          graphQLErrors: [{ message: "something went wrong!" }],
        }),
      }),
  } as any;
  render(
    <BrowserRouter>
      <GlobalContext.Provider
        value={{ isMobile: false, setHeaderAttrs: mockSetHeaderAttrs } as any}
      >
        <Provider value={errorState}>
          <Login />
        </Provider>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "TEST!" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "TEST!" },
  });
  fireEvent.click(screen.getByText("Log In"));
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(
      "something went wrong!"
    );
  });
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "TES" },
  });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("success response should call setAccessToken, reexecute and navigate", async () => {
  const reexecuteViewerMock = jest.fn();
  const tokenSpy = jest.spyOn(tokenHandlers, "setAccessToken");
  const responseState = {
    executeMutation: () =>
      fromValue({
        data: {
          login: {
            accessToken: "sadf8af89sf",
          },
        },
      }),
  } as any;
  render(
    <BrowserRouter>
      <GlobalContext.Provider
        value={
          {
            isMobile: false,
            reexecuteViewerQuery: reexecuteViewerMock,
            setHeaderAttrs: mockSetHeaderAttrs,
          } as any
        }
      >
        <Provider value={responseState}>
          <Login />
        </Provider>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "TEST!" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "TEST!" },
  });
  fireEvent.click(screen.getByText("Log In"));
  await waitFor(() => {
    expect(reexecuteViewerMock).toBeCalledTimes(1);
  });
  expect(tokenSpy).toBeCalledTimes(1);
  expect(mockedUsedNavigate).toBeCalledTimes(1);
});

test("links should route to sign up and password reset. isMobile toggles sign up route", async () => {
  const history = createMemoryHistory();
  history.push = jest.fn();
  const mockClient = {
    executeQuery: jest.fn(),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(),
  } as any;
  const { rerender } = render(
    <Router location={history.location} navigator={history}>
      <GlobalContext.Provider
        value={{ isMobile: false, setHeaderAttrs: mockSetHeaderAttrs } as any}
      >
        <Provider value={mockClient}>
          <Login />
        </Provider>
      </GlobalContext.Provider>
    </Router>
  );

  fireEvent.click(screen.getByText("Forgot password?"));
  expect(history.push).toHaveBeenCalledWith(
    {
      hash: "",
      pathname: "/accounts/password/reset",
      search: "",
    },
    undefined
  );

  fireEvent.click(screen.getByText("Sign up"));
  expect(history.push).toHaveBeenCalledWith(
    {
      hash: "",
      pathname: "/accounts/signup/emailsignup",
      search: "",
    },
    undefined
  );
  rerender(
    <Router location={history.location} navigator={history}>
      <GlobalContext.Provider
        value={{ isMobile: true, setHeaderAttrs: mockSetHeaderAttrs } as any}
      >
        <Provider value={mockClient}>
          <Login />
        </Provider>
      </GlobalContext.Provider>
    </Router>
  );
  fireEvent.click(screen.getByText("Sign up"));
  expect(history.push).toHaveBeenCalledWith(
    {
      hash: "",
      pathname: "/accounts/signup/email",
      search: "",
    },
    undefined
  );
});
