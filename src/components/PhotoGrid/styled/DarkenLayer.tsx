import styled from "styled-components";

interface Props {}

export const DarkenLayer = styled.div<Props>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
`;
