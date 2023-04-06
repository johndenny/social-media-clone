import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { JSXElementConstructor, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalContext, { DataProvider } from "./context/GlobalContext";
import { CombinedError, Provider } from "urql";
import { never, fromValue } from "wonka";
import { renderWithRouter } from "./utils/testHelpers";

const mockClientFetch = {
  executeMutation: () => never,
} as any;

const mockClientError = {
  executeQuery: () =>
    fromValue({
      error: new CombinedError({
        graphQLErrors: [{ message: "test error!!!" }],
      }),
    }),
} as any;

beforeEach(() => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: "Mobi",
  });
});

describe("Mobile", () => {
  test("should route with header", () => {
    renderWithRouter(
      <Provider value={mockClientError}>
        <DataProvider>
          <App />
        </DataProvider>
      </Provider>,
      { route: "/accounts/signup/email" }
    );
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/accounts/signup/email");
  });

  test("should reroute to /accounts/signup/email", () => {
    renderWithRouter(
      <Provider value={mockClientError}>
        <DataProvider>
          <App />
        </DataProvider>
      </Provider>,
      { route: "/accounts/signup/emailconfirmation" }
    );
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.queryByLabelText("Passcode")).not.toBeInTheDocument();
    expect(window.location.pathname).toBe("/accounts/signup/email");
  });

  test("should reroute to /accounts/signup/email from /accounts/signup/name", () => {
    renderWithRouter(
      <Provider value={mockClientError}>
        <DataProvider>
          <App />
        </DataProvider>
      </Provider>,
      { route: "/accounts/signup/name" }
    );
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();
    expect(window.location.pathname).toBe("/accounts/signup/email");
  });

  test("should reroute from /accounts/signup/username", () => {});
});

beforeEach(() => {
  global.window = Object.create(window);
  Object.defineProperty(window.navigator, "UserAgent", { value: "" });
});

test("should reroute", () => {
  renderWithRouter(
    <Provider value={mockClientError}>
      <DataProvider>
        <App />
      </DataProvider>
    </Provider>,
    { route: "/accounts/signup/email" }
  );
  expect(screen.getByText("Register")).toBeInTheDocument();
  expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  expect(window.location.pathname).toBe("/accounts/signup/email");
});
