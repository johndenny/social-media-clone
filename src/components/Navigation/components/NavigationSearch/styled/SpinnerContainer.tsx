import styled from "styled-components";

interface Props {}

export const SpinnerContainer = styled.div<Props>`
  height: 20px;
  width: 20px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
`;
