import styled from "styled-components";

interface Props {}

export const Button = styled.button<Props>`
  padding: 8px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;
