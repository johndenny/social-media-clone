import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FooterPopUp } from ".";
import { act } from "react-dom/test-utils";

test("shold show message then remove message only on second transition end", async () => {
  jest.useFakeTimers();
  const handleMessage = jest.fn();
  render(
    <FooterPopUp
      isMobile={false}
      isLoggedIn={false}
      footerMessage="HELLO!"
      setFooterMessage={handleMessage}
    />
  );
  fireEvent.transitionEnd(screen.getByRole("alert"));
  expect(handleMessage).toHaveBeenCalledTimes(0);
  act(() => {
    jest.advanceTimersByTime(3001);
  });
  const paragraph = screen.getByText(/HELLO!/i);
  expect(paragraph).toBeInTheDocument();
  fireEvent.transitionEnd(screen.getByRole("alert"));
  expect(handleMessage).toHaveBeenCalledTimes(1);
});
