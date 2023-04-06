import React, { ButtonHTMLAttributes } from "react";
import { ButtonStyle } from "./styled";
import { Button } from "../../styled";
import { Spinner } from "../Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fetching?: boolean;
  margin?: string;
  padding?: string;
  fillType?: "secondary";
}

/**
 * Padded Button
 *
 * @component
 * @prop {boolean} fetching boolean toggles spinner and makes children transparent.
 * @prop {string} margin undefined returns 0.
 * @prop {string} padding undefined return 5px 9px.
 * @prop {string} fillType undefined returns blue fill with transparent boarder. "secondary" return black border with transparent fill.
 *
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
export const PaddedButton = React.forwardRef(
  (
    { fetching, margin, padding, children, fillType, ...attr }: ButtonProps,
    ref
  ) => {
    return (
      <ButtonStyle
        fillType={fillType}
        fetching={fetching}
        margin={margin}
        padding={padding}
        as={Button}
        ref={ref}
        {...attr}
      >
        {fetching && (
          <div style={{ position: "absolute" }}>
            <Spinner
              size="small"
              fill={fillType !== "secondary" ? "#FAFAFA" : undefined}
            />
          </div>
        )}
        {children}
      </ButtonStyle>
    );
  }
);
