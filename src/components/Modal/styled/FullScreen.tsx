import styled from "styled-components";

interface Props {}

export const FullScreen = styled.div<Props>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(var(--primary-background));
  z-index: 4;
`;
