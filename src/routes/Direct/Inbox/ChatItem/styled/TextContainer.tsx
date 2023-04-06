import styled from "styled-components";

interface Props {}

export const TextContainer = styled.div<Props>`
  gap: 2px;
  flex: 1;
  justify-content: center;
  font-weight: 400;
  min-width: 0;
  text-overflow: ellipsis;
  overflow-x: hidden;
`;
