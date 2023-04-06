import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  background-color: rgb(var(--secondary-background));
  border: 1px solid rgb(var(--highlight-background));
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
`;
