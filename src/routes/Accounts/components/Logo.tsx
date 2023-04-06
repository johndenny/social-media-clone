import React from "react";
import wordmark from "../../../assets/images/logged_out_wordmark-2x.png";
import { Img } from "../styled";

interface Props {}

export const Logo: React.FC<Props> = () => {
  return (
    <div style={{ width: "175px", margin: "42px 36px 0 36px" }}>
      <Img alt="Instagram" src={wordmark} />
    </div>
  );
};
