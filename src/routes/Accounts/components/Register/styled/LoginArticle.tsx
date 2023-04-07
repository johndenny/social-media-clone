import styled from "styled-components";

export const LoginArticle = styled.article`
  align-items: center;
  width: 100%;
  max-width: 350px;
  @media (max-width: 450px) {
    background-color: transparent;
    border: 1px solid transparent;
  }
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
  padding: 40px;
`;
