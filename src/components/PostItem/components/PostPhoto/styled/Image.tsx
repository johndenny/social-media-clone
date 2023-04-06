import styled from "styled-components";

interface Props {}

export const Image = styled.img<Props>`
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: absolute;
  background-color: rgb(var(--highlight-background));
`;
