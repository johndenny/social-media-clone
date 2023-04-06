import styled from "styled-components";

interface Props {
  aspectRatio: number;
}

export const PhotoPlaceholder = styled.div<Props>`
  background-color: rgb(var(--highlight-background));
  height: calc(100vh - 60px);
  ${(props) =>
    props.aspectRatio < 1
      ? { width: `calc((100vh - 120px) * ${props.aspectRatio})` }
      : { width: "calc(100vh - 120px)" }}
`;
