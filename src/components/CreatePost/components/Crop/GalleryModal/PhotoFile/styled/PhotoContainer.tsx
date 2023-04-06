import styled from "styled-components";

interface Props {}

export const PhotoContainer = styled.div<Props>`
  align-items: center;
  justify-content: center;
  height: 94px;
  width: 94px;
  overflow: hidden;
  margin: 0 6px;
  transition: transform 0.3s ease-in-out;
`;
