import styled from "styled-components";

interface Props {}

export const CanvasContainer = styled.div<Props>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgb(var(--secondary-background));
  max-height: 855px;
`;
