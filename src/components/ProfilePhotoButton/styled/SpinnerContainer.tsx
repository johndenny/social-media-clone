import styled from "styled-components";

interface Props {}

export const SpinnerContainer = styled.div<Props>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
