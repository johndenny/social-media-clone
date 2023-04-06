import styled from "styled-components";

interface Props {}

export const Button = styled.button<Props>`
  flex-direction: column;
  align-items: center;
  width: 33.333%;
  :active {
    opacity: 0.7;
  }
`;
