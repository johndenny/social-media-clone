import styled from "styled-components";

interface Props {}

export const Container = styled.li<Props>`
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(var(--highlight-background));
`;
