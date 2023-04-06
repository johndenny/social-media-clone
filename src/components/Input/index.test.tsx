import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from ".";
import { act } from "react-dom/test-utils";
import React from "react";

test("should show error message, hide error message on input focus and match label text", () => {
  render(
    <Input
      errorMessage="testing!"
      Type="text"
      name="testing-name"
      label="testing label"
    />
  );
  expect(screen.getByLabelText("testing label")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByText("testing!")).toBeInTheDocument();
  act(() => {
    screen.getByRole("textbox").focus();
  });
  expect(screen.queryByText("testing!")).not.toBeInTheDocument();
  fireEvent.keyPress(screen.getByRole("textbox"), {
    key: "Enter",
    code: 13,
    charCode: 13,
  });
  expect(screen.getByText("testing!")).toBeInTheDocument();
});

test("should toggle button visability when input value is true or false, click even should toggle button text and input type fomr text to password", () => {
  const { rerender } = render(
    <Input
      Type="password"
      name="password"
      label="Password"
      value="test!"
      readOnly
    />
  );
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Show");
  expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  fireEvent.click(button);
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  expect(button).toHaveTextContent("Hide");
  rerender(
    <Input Type="password" name="password" label="Password" value="" readOnly />
  );
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});
