import styled from "styled-components";

interface Props {}

export const PhotoPlaceholder = styled.div<Props>`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: rgb(var(--highlight-background));
  margin-bottom: 16px;
`;
