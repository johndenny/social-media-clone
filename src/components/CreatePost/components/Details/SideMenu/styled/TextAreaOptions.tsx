import styled from "styled-components";

interface Props {}

export const TextAreaOptions = styled.div<Props>`
  user-select: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 12px 8px;
  font-size: 12px;
  color: rgb(var(--tertiary-text));
  border-bottom: 1px solid rgb(var(--stroke));
`;
