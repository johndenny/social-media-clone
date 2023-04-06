import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from ".";
import GlobalContext from "../../context/GlobalContext";

test("should toggle render of HeaderMobile and FooterMobile and render footerPopUp", () => {
  const mockValues: any = {
    viewer: { data: { viewer: { username: "test" } } },
    footerMessage: "Test!",
    isMobile: true,
    headerAttrs: {
      leftButton: "new-story",
      title: "logo",
      rightButton: "messenger",
    },
  };
  const { rerender } = render(
    <BrowserRouter>
      <GlobalContext.Provider value={{ ...mockValues }}>
        <Layout />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
  expect(screen.getAllByRole("img").length).toBe(4);
  expect(screen.getByRole("alert")).toHaveTextContent("Test!");
  rerender(
    <BrowserRouter>
      <GlobalContext.Provider value={{ ...mockValues, isMobile: false }}>
        <Layout />
      </GlobalContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryAllByRole("img").length).toBe(0);
});
