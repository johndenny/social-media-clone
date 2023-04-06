import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Router } from "react-router-dom";
import { CombinedError, Provider } from "urql";
import { fromValue } from "wonka";
import { Reset } from ".";
import GlobalContext from "../../../../context/GlobalContext";
import { createMemoryHistory } from "history";

const mockClient = {
  executeMutation: () =>
    fromValue({
      fetching: true,
      data: null,
    }),
} as any;

test("should render elements. isMobile toggles footer link styles", () => {
  const { rerender } = render(
    <BrowserRouter>
      <Provider value={mockClient}>
        <GlobalContext.Provider value={{ isMobile: false } as any}>
          <Reset />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  expect(document.title).toBe("Reset Password • Instagram");
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Trouble Logging In?"
  );
  expect(
    screen.getByText(
      "Enter your email, or username and we'll send you a link to reset your password."
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("form")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByLabelText("Username or email")).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Send Reset Link");
  expect(screen.getByText("OR")).toBeInTheDocument();
  const links = screen.getAllByRole("link");
  expect(links[0]).toHaveTextContent("Create New Account");
  expect(links[1]).toHaveTextContent("Back To Login");
  expect(screen.getByTestId("back-footer")).toHaveStyle("position: absolute;");
  rerender(
    <BrowserRouter>
      <Provider value={mockClient}>
        <GlobalContext.Provider value={{ isMobile: true } as any}>
          <Reset />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByTestId("back-footer")).toHaveStyle("position: fixed;");
});

test("link should route correctly, isMobile toggles location", () => {
  const history = createMemoryHistory();
  history.push = jest.fn();
  const { rerender } = render(
    <Router location={history.location} navigator={history}>
      <GlobalContext.Provider value={{ isMobile: false } as any}>
        <Provider value={mockClient}>
          <Reset />
        </Provider>
      </GlobalContext.Provider>
    </Router>
  );
  fireEvent.click(screen.getByText("Back To Login"));
  expect(history.push).toHaveBeenCalledWith(
    {
      hash: "",
      pathname: "/accounts/login",
      search: "",
    },
    undefined
  );
  fireEvent.click(screen.getByText("Create New Account"));
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
      <GlobalContext.Provider value={{ isMobile: true } as any}>
        <Provider value={mockClient}>
          <Reset />
        </Provider>
      </GlobalContext.Provider>
    </Router>
  );
  fireEvent.click(screen.getByText("Create New Account"));
  expect(history.push).toHaveBeenCalledWith(
    {
      hash: "",
      pathname: "/accounts/signup/email",
      search: "",
    },
    undefined
  );
});

const mockClientFetching = {
  executeMutation: () =>
    fromValue({
      fetching: true,
      data: null,
    }),
} as any;

test("fetching response should toggle button text with spinner", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientFetching}>
        <GlobalContext.Provider value={{ isMobile: false } as any}>
          <Reset />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByRole("button")).toHaveTextContent("Send Reset Link");
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "TEST!" },
  });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.getByRole("button")).toContainElement(
      screen.getByAltText("Loading...")
    );
  });
  expect(screen.queryByText("Send Reset Link")).not.toBeInTheDocument();
});

const mockClientError = {
  executeMutation: () =>
    fromValue({
      error: new CombinedError({
        graphQLErrors: [{ message: "test error!" }],
      }),
    }),
} as any;

test("error response should display error message. remove error on textbox change", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientError}>
        <GlobalContext.Provider value={{ isMobile: false } as any}>
          <Reset />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "TEST!" },
  });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent("test error!");
  });
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "TEST" },
  });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

const mockClientSuccess = {
  executeMutation: () =>
    fromValue({
      data: { sendReset: { censoredEmail: "test@test" } },
    }),
} as any;

test("successful response", async () => {
  const { rerender } = render(
    <BrowserRouter>
      <Provider value={mockClientSuccess}>
        <GlobalContext.Provider value={{ isMobile: false } as any}>
          <Reset />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "TEST!" },
  });
  expect(screen.getByDisplayValue("TEST!")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button"));
  //Not in Document//
  await waitFor(() => {
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
  expect(screen.queryByRole("heading", { level: 4 })).not.toHaveTextContent(
    "Trouble Logging In?"
  );
  expect(
    screen.queryByText(
      "Enter your email, or username and we'll send you a link to reset your password."
    )
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("form")).not.toBeInTheDocument();
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Username or email")).not.toBeInTheDocument();
  expect(screen.queryByRole("button")).not.toHaveTextContent("Send Reset Link");
  expect(screen.queryByText("OR")).not.toBeInTheDocument();
  const links = screen.queryAllByRole("link");
  expect(links[0]).not.toHaveTextContent("Create New Account");
  //In Document//
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Email Sent"
  );
  expect(screen.getByTestId("censored-email").textContent).toBe(
    "We sent an email to test@test with a link to reset your password."
  );
  expect(screen.getByRole("button")).toHaveTextContent("OK");
  expect(screen.getByRole("link")).toHaveTextContent("Back To Login");
  expect(screen.getByTestId("back-footer")).toHaveStyle("position: absolute;");
  //isMobile rerender//
  rerender(
    <BrowserRouter>
      <Provider value={mockClientSuccess}>
        <GlobalContext.Provider value={{ isMobile: true } as any}>
          <Reset />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByTestId("back-footer")).toHaveStyle("position: fixed;");
  //Toggle back//
  fireEvent.click(screen.getByRole("button"));
  //Not in Document//
  expect(screen.queryByRole("heading", { level: 4 })).not.toHaveTextContent(
    "Email Sent"
  );
  expect(screen.queryByTestId("censored-email")).not.toBeInTheDocument();
  expect(screen.queryByRole("button")).not.toHaveTextContent("OK");
  //In Document//
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Trouble Logging In?"
  );
  expect(
    screen.getByText(
      "Enter your email, or username and we'll send you a link to reset your password."
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("form")).toBeInTheDocument();
  expect(screen.getByDisplayValue("")).toBeInTheDocument();
  expect(screen.getByLabelText("Username or email")).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Send Reset Link");
  expect(screen.getByText("OR")).toBeInTheDocument();
  const newlinks = screen.getAllByRole("link");
  expect(newlinks[0]).toHaveTextContent("Create New Account");
  expect(newlinks[1]).toHaveTextContent("Back To Login");
  expect(screen.getByTestId("back-footer")).toHaveStyle("position: fixed;");
});
