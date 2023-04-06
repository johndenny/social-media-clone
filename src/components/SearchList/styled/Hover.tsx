import styled from "styled-components";

interface Props {}

export const Hover = styled.div<Props>`
  :hover {
    background-color: rgb(var(--secondary-background));
  }
`;
