import styled from "styled-components";

interface Props {}

export const Button = styled.button<Props>`
  flex: 1;
  align-items: center;
  justify-content: center;
  :disabled {
    opacity: 0.3;
  }
`;
