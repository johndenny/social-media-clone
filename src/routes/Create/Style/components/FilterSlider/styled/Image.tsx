import styled from "styled-components";

interface Props {}

export const Image = styled.img<Props>`
  background-color: rgb(var(--highlight-background));
  border: 0;
  font: inherit;
  font-size: 100%;
  height: 100px;
  width: 100px;
  margin: 0;
  padding: 0;
  transition: transform 0.05s ease-out;
  vertical-align: baseline;

  &:active {
    transform: scale(0.95);
  }
`;
