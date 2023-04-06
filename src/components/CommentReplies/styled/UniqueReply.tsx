import styled from "styled-components";

interface Props {}

export const UniqueReply = styled.div<Props>`
  margin-bottom: 16px;
  margin-left: -16px;
  margin-right: -16px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgb(var(--stroke));
  border-right: none;
  background-color: rgb(var(--highlight-background));
`;
