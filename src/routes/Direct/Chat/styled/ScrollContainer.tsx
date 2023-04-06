import styled from "styled-components";

interface Props {}

export const ScrollContainer = styled.div<Props>`
  padding: 16px 16px 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column-reverse;
`;
