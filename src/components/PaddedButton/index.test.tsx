import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PaddedButton } from ".";

test("should show toggle spinner for children text", () => {
  const { rerender } = render(
    <PaddedButton fetching={true} padding="10px 18px" margin="10px">
      Test!
    </PaddedButton>
  );
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveStyle("margin: 10px;");
  rerender(
    <PaddedButton fetching={false} padding="10px 18px">
      Test!
    </PaddedButton>
  );
  expect(screen.getByRole("button")).toHaveTextContent("Test!");
});
