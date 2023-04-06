import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  background: rgb(var(--highlight-background));
  border: 1px solid rgb(var(--highlight-background));
  border-radius: 22px;
`;
