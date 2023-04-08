import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "./styled";
import { LoginArticle } from "../../styled";

interface Props {}

export const Register: React.FC<Props> = () => {
  return (
    <Container>
      <LoginArticle>
        <Outlet />
      </LoginArticle>
    </Container>
  );
};
