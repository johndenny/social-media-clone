import styled from "styled-components";

interface Props {}

export const TextContainer = styled.div<Props>`
  white-space: pre;
  gap: 16px;
  flex: 1;
  max-width: calc(100% - 76px);
`;
