import styled from "styled-components";

interface Props {}

export const Thumbnail = styled.div<Props>`
  height: 36px;
  margin: 8px;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  background-color: rgb(var(--highlight-background));
`;
