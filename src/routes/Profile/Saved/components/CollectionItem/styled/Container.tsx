import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  border: 1px solid rgb(var(--stroke));
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 1;
  background-color: rgb(var(--highlight-background));
  flex: 1;
  :hover {
    opacity: 0.8;
  }
`;
