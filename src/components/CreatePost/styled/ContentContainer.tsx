import styled from "styled-components";

interface Props {}

export const ContentContainer = styled.div<Props>`
  flex: 1 1 auto;
  flex-direction: row;
  height: min(calc(100vh - 88px), calc(100vw - 44px));
`;
