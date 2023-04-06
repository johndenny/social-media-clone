import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { never, fromValue } from "wonka";
import { Username } from ".";
import { BrowserRouter } from "react-router-dom";
import { CombinedError, Provider } from "urql";
import GlobalContext from "../../../../context/GlobalContext";

const mockReexecuteViewerQuery = jest.fn();
const mockSetFooterMessage = jest.fn();
const mockContext = {
  setFooterMessage: mockSetFooterMessage,
  reexecuteViewerQuery: mockReexecuteViewerQuery,
} as any;

const mockClientFetch = {
  executeMutation: () => never,
  executeQuery: () =>
    fromValue({
      data: {
        checkUsername: false,
        viewer: { username: "tester123" },
      },
    }),
} as any;

const mockUsernameError = {
  executeQuery: () =>
    fromValue({
      data: {
        checkUsername: true,
        viewer: { username: "tester123" },
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
        checkUsername: false,
        viewer: { username: "tester123" },
      },
    }),
} as any;

const mockClientSuccess = {
  executeMutation: () => fromValue({ data: true }),
  executeQuery: () =>
    fromValue({
      data: { checkUsername: false, viewer: { username: "tester123" } },
    }),
} as any;

test("should render elements, show spinner when fetching", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientFetch}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Username />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Welcome to Instagram, tester123"
  );
  expect(
    screen.getByText(
      "Find people to follow and start sharing photos. You can change your username anytime."
    )
  ).toBeInTheDocument();
  expect(screen.getByText("Change username")).toBeInTheDocument();
  expect(screen.getByRole("form")).toHaveAttribute("name", "username");
  expect(screen.getByText("Next")).not.toHaveAttribute("disabled");
  fireEvent.click(screen.getByText("Next"));

  fireEvent.click(screen.getByText("Change username"));
  expect(screen.queryByRole("heading", { level: 4 })).not.toHaveTextContent(
    "Welcome to Instagram, tester123"
  );
  expect(
    screen.queryByText(
      "Find people to follow and start sharing photos. You can change your username anytime."
    )
  ).not.toBeInTheDocument();
  expect(screen.queryByText("Change username")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Change Username"
  );
  expect(
    screen.getByText(
      "Pick a username for your account. You can always change it later."
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveFocus();
  expect(screen.getByRole("textbox")).toHaveValue("tester123");
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.getByRole("button")).toContainElement(
      screen.getByRole("img")
    );
  });
});

test("should show errors", async () => {
  const { rerender } = render(
    <BrowserRouter>
      <Provider value={mockUsernameError}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Username />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Change username"));
  fireEvent.blur(screen.getByRole("textbox"));
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This username is already being used"
    );
  });
  rerender(
    <BrowserRouter>
      <Provider value={mockClientError}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Username />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "testing123" },
  });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(mockSetFooterMessage).toBeCalledWith("test error!!!");
  });
});

test("sucessful response", async () => {
  render(
    <BrowserRouter>
      <Provider value={mockClientSuccess}>
        <GlobalContext.Provider value={{ ...mockContext }}>
          <Username />
        </GlobalContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Change username"));
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(mockReexecuteViewerQuery).toBeCalledTimes(1);
  });
});
