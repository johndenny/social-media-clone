import React from "react";
import { Outlet } from "react-router-dom";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import useWindowSize from "../../hooks/useWindowSize";
import { SideBar } from "./components/SideBar";
import { Container } from "./styled";

interface Props {}

export const Accounts: React.FC<Props> = () => {
  const { width } = useWindowSize();
  const { isMobile } = useGlobalContext() as globalContextType;
  return (
    <Container isMobile={isMobile}>
      {width > 735 && !isMobile && <SideBar />}
      <Outlet />
    </Container>
  );
};
