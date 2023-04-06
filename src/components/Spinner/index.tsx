import React from "react";
import { ReactComponent as SpinnerLargeSvg } from "../../assets/svgs/spinnerLarge.svg";
import { ReactComponent as SpinnerSmallSvg } from "../../assets/svgs/spinnerSmall.svg";
import { Animation, Container } from "./styled";

interface Props {
  size: "large" | "small";
  containerStyle?: "fill";
  fill?: string;
}

export const Spinner: React.FC<Props> = ({ size, containerStyle, fill }) => {
  return (
    <Container containerStyle={containerStyle}>
      <Animation>
        {size === "large" && <SpinnerLargeSvg height={32} width={32} />}
        {size === "small" && (
          <SpinnerSmallSvg
            height={18}
            width={18}
            fill={fill ? fill : undefined}
          />
        )}
      </Animation>
    </Container>
  );
};
