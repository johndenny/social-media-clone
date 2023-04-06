import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { CombinedError, Provider } from "urql";
import { fromValue } from "wonka";
import { Confirm } from ".";

const mockClient = {
  executeMutation: () =>
    fromValue({
      fetching: true,
      data: null,
    }),
} as any;

const mockClientError = {
  executeMutation: () =>
    fromValue({
      error: new CombinedError({
        graphQLErrors: [{ message: "test error" }],
      }),
    }),
} as any;

const mockClientSuccess = {
  executeMutation: () =>
    fromValue({
      data: true,
    }),
} as any;

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("should reroute when search params missing, nothing when params present", async () => {
  let history = createMemoryHistory();
  history.push("/confirm/?uid=1234&token=1234");
  render(
    <Router location={history.location} navigator={history}>
      <Provider value={mockClient}>
        <Routes>
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </Provider>
    </Router>
  );
  await waitFor(() => {
    expect(mockedUsedNavigate).toBeCalledTimes(0);
  });
  history = createMemoryHistory();
  history.push("/confirm/?uid=1234&token=");
  render(
    <Router location={history.location} navigator={history}>
      <Provider value={mockClient}>
        <Routes>
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </Provider>
    </Router>
  );
  expect(mockedUsedNavigate).toBeCalledTimes(1);
});

test("should reroute when verify returns error", async () => {
  let history = createMemoryHistory();
  history.push("/confirm/?uid=1234&token=1234");
  render(
    <Router location={history.location} navigator={history}>
      <Provider value={mockClientError}>
        <Routes>
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </Provider>
    </Router>
  );
  await waitFor(() => {
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});

test("should render elements", () => {
  render(
    <BrowserRouter>
      <Provider value={mockClient}>
        <Confirm />
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Create a Strong Password"
  );
  expect(
    screen.getByText(
      "Your password must be at least 6 characters and include a number, letter and special character (!$@%)."
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("form")).toBeInTheDocument();
  expect(screen.getByLabelText("New password")).toBeInTheDocument();
  expect(screen.getByLabelText("Confirm new password")).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Reset Password");
});

test("should display error for unmatched or invalid password. button toggles input type. submit button diabled when password are invalid", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClient}>
        <Confirm />
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByRole("button")).toHaveAttribute("disabled");
  fireEvent.change(screen.getByLabelText("New password"), {
    target: { value: "TEST!" },
  });
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Your password must be at least 8 characters and include a number, letter, capital letter and special character (!$@%)."
  );
  fireEvent.change(screen.getByLabelText("New password"), {
    target: { value: "!Aa12345" },
  });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Confirm new password"), {
    target: { value: "!Aa1234" },
  });
  expect(screen.getByLabelText("New password")).toHaveAttribute(
    "type",
    "password"
  );
  expect(screen.getByLabelText("Confirm new password")).toHaveAttribute(
    "type",
    "password"
  );
  expect(screen.queryAllByRole("button")).toHaveLength(3);
  fireEvent.click(screen.queryAllByText("Show")[1]);
  fireEvent.click(screen.queryAllByText("Show")[0]);
  expect(screen.getByLabelText("New password")).toHaveAttribute("type", "text");
  expect(screen.getByLabelText("Confirm new password")).toHaveAttribute(
    "type",
    "text"
  );
  expect(screen.getByRole("alert")).toHaveTextContent("Passwords don't match.");
  fireEvent.change(screen.getByLabelText("Confirm new password"), {
    target: { value: "!Aa12345" },
  });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getByText("Reset Password")).not.toHaveAttribute("disabled");
});

test("error response should display error message", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientError}>
        <Confirm />
      </Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByLabelText("New password"), {
    target: { value: "!Aa12345" },
  });
  fireEvent.change(screen.getByLabelText("Confirm new password"), {
    target: { value: "!Aa12345" },
  });
  fireEvent.click(screen.getByText("Reset Password"));
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent("test error");
  });
});

test("successful response should render new elements", async () => {
  let history = createMemoryHistory();
  history.push("/confirm/?uid=1234&token=1234");
  render(
    <Router location={history.location} navigator={history}>
      <Provider value={mockClientSuccess}>
        <Routes>
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </Provider>
    </Router>
  );
  fireEvent.change(screen.getByLabelText("New password"), {
    target: { value: "!Aa12345" },
  });
  fireEvent.change(screen.getByLabelText("Confirm new password"), {
    target: { value: "!Aa12345" },
  });
  fireEvent.click(screen.getByText("Reset Password"));
  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Your Password has been reset"
    );
  });
  expect(screen.getByRole("button")).toHaveTextContent("Log in");
  //Not in document //
  expect(screen.queryByRole("heading", { level: 4 })).not.toHaveTextContent(
    "Create a Strong Password"
  );
  expect(
    screen.queryByText(
      "Your password must be at least 6 characters and include a number, letter and special character (!$@%)."
    )
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("form")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("New password")).not.toBeInTheDocument();
  expect(
    screen.queryByLabelText("Confirm new password")
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("button")).not.toHaveTextContent("Reset Password");
  fireEvent.click(screen.getByRole("button"));
  expect(mockedUsedNavigate).toBeCalledTimes(1);
});
