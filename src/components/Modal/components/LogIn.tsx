import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { Login } from "../../../routes/Accounts/Login";
import { BackDrop, Container, CloseButton } from "../styled";
import { ReactComponent as CloseSvg } from "../../../assets/svgs/close.svg";

interface Props {
  type: string;
}

export const LogIn: React.FC<Props> = ({ type }) => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setModalAttrs(null)}>
          <CloseSvg />
        </CloseButton>

        <div style={{ padding: "0 42px 42px", alignItems: "center" }}>
          <Login isSwitch={type === "log-in-switch"} />
        </div>
      </Container>
    </BackDrop>
  );
};
