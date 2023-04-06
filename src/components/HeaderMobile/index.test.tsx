import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import {
  HeaderMobile,
  LeftHeaderButton,
  RightHeaderButton,
} from "../HeaderMobile";

test("should render one button with image, and two anchors with images", () => {
  render(
    <BrowserRouter>
      <HeaderMobile
        leftButton={LeftHeaderButton.newStory}
        title="logo"
        rightButton={RightHeaderButton.messenger}
      />
    </BrowserRouter>
  );
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getAllByRole("link").length).toBe(2);
  expect(screen.getAllByRole("img").length).toBe(3);
});

test("should render back button with image and header with matching text", () => {
  render(
    <BrowserRouter>
      <HeaderMobile
        leftButton={LeftHeaderButton.backChevron}
        title="Testing!"
      />
    </BrowserRouter>
  );
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeVisible();
  expect(screen.getAllByRole("img").length).toBe(1);
  expect(screen.getByText("Testing!")).toBeVisible();
});
