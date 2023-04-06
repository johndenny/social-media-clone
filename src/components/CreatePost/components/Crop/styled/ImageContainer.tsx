import styled from "styled-components";

interface Props {}

export const ImageContainer = styled.div<Props>`
  background-color: rgb(var(--primary-background));
  background-repeat: no-repeat;
  bottom: 0;
  /* display: block; */
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;
