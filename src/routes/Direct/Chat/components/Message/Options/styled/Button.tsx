import styled from "styled-components";

interface Props {}

export const Button = styled.button<Props>`
  min-width: 28px;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;
