import styled from "styled-components";

interface Props {}

export const AbsoluteContainer = styled.div<Props>`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  touch-action: none;
`;
