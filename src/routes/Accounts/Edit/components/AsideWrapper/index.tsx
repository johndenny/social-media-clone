import React, { ReactNode } from "react";
import { Aside, AsideContainer, Padding } from "../../styled";

interface Props {
  children: ReactNode;
}

export const AsideWrapper: React.FC<Props> = ({ children }) => {
  return (
    <AsideContainer>
      <Aside></Aside>
      <Padding>{children}</Padding>
    </AsideContainer>
  );
};
