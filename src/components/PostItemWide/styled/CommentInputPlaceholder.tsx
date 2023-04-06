import styled from "styled-components";

interface Props {}

export const CommentInputPlaceholder = styled.div<Props>`
  border-top: 1px solid rgb(var(--highlight-background));
  padding: 16px;
  flex-direction: row;
  gap: 4px;
`;
