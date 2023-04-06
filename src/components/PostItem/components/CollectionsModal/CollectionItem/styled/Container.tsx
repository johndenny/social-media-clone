import styled from "styled-components";

interface Props {}

export const Container = styled.button<Props>`
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  :hover {
    background-color: rgb(var(--secondary-background));
  }
`;
