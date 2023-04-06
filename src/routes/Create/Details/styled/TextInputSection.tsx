import styled from "styled-components";

interface Props {}

export const TextInputSection = styled.section<Props>`
  flex-direction: row;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid rgb(var(--stroke));
  z-index: 1;
  background-color: rgb(var(--primary-background));
`;
