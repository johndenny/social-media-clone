import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { CombinedError, Provider } from "urql";
import { fromValue } from "wonka";
import { Profile } from ".";
import Layout from "../../components/Layout";
import GlobalContext, { DataProvider } from "../../context/GlobalContext";
import { renderWithRouter } from "../../utils/testHelpers";

const mockExecuteViewerQuery = jest.fn();
const mockClient = {
  executeQuery: mockExecuteViewerQuery,
} as any;

const mockClientSuccessLoggedOut = {
  executeQuery: () =>
    fromValue({
      data: {
        user: { username: "tester123", fullName: "mister test" },
      },
      error: new CombinedError({
        graphQLErrors: [{ message: "test error!!!" }],
      }),
    }),
} as any;

const mockClientSuccess = {
  executeQuery: () =>
    fromValue({
      data: {
        user: { username: "tester123", fullName: "mister test" },
        viewer: { username: "tester123", fullName: "mister test" },
      },
    }),
} as any;

const mockClientSuccessNotCurrentUser = {
  executeQuery: () =>
    fromValue({
      data: {
        user: { username: "tester123", fullName: "mister test" },
        viewer: { username: "hello 123", fullName: "hello test" },
      },
    }),
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

test("should show logged out header when no user is logged in", async () => {
  renderWithRouter(
    <Provider value={mockClientSuccessLoggedOut}>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:username" element={<Profile />} />
          </Route>
        </Routes>
      </DataProvider>
    </Provider>,
    { route: "/alice" }
  );
  await waitFor(() => {
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  expect(screen.getByText("Log in")).toBeInTheDocument();
});

test("should send params as query args", () => {
  renderWithRouter(
    <Provider value={mockClient}>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:username" element={<Profile />} />
          </Route>
        </Routes>
      </DataProvider>
    </Provider>,
    { route: "/alice" }
  );
  const variables = { username: "alice" };
  expect(mockExecuteViewerQuery).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({ variables }),
    { requestPolicy: undefined }
  );
});

test("should query for user and match current user", async () => {
  renderWithRouter(
    <Provider value={mockClientSuccess}>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:username" element={<Profile />} />
          </Route>
        </Routes>
      </DataProvider>
    </Provider>,
    { route: "/alice" }
  );
  expect(document.title).toBe("@tester123 • Instagram photos and videos");
  expect(screen.getAllByRole("heading", { level: 1 })[0]).toHaveTextContent(
    "tester123"
  );
  await waitFor(() => {
    expect(screen.getAllByAltText("Options")).toHaveLength(2);
  });
  expect(screen.getByAltText("Discover People")).toBeInTheDocument();
  expect(screen.getAllByAltText("tester123's Profile Photo")).toHaveLength(2);
  expect(screen.getByText("Edit profile")).toBeInTheDocument();
});

test("should query for user without current user match", () => {
  renderWithRouter(
    <Provider value={mockClientSuccessNotCurrentUser}>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:username" element={<Profile />} />
          </Route>
        </Routes>
      </DataProvider>
    </Provider>,
    { route: "/alice" }
  );
  expect(document.title).toBe("@tester123 • Instagram photos and videos");
  expect(screen.getAllByRole("heading", { level: 1 })[0]).toHaveTextContent(
    "tester123"
  );
  expect(screen.getByLabelText("Back")).toBeInTheDocument();
});

test("should show not found page", () => {
  renderWithRouter(
    <Provider value={mockClientError}>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:username" element={<Profile />} />
          </Route>
        </Routes>
      </DataProvider>
    </Provider>,
    { route: "/alice" }
  );
  expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Sorry, this page isn't available."
  );
  expect(document.title).toBe("Page not found • Instagram");
});
