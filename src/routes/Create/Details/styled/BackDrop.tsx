import styled from "styled-components";

interface Props {}

export const BackDrop = styled.div<Props>`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
`;
