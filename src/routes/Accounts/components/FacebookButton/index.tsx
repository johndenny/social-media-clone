import React from "react";
import { PaddedButton } from "../../../../components/PaddedButton";
import { FacebookIcon } from "./styled/FacebookIcon";

interface Props {}

export const FacebookButton: React.FC<Props> = () => {
  return (
    <PaddedButton
      fetching={false}
      margin="8px 0"
      padding="10px 18px"
      type="button"
    >
      <FacebookIcon
        className="coreSpriteFacebookIconInverted"
        role="img"
      ></FacebookIcon>
      <span>Continue with Facebook</span>
    </PaddedButton>
  );
};
