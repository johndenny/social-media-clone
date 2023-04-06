import styled from "styled-components";

interface Props {
  width: number;
}

export const TextPlaceholder = styled.div<Props>`
  background-color: rgb(var(--highlight-background));
  height: 14px;
  width: ${(props) => props.width}px;
  border-radius: 4px;
`;
