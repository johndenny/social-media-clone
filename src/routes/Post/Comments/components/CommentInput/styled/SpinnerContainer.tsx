import styled from "styled-components";

interface Props {}

export const SpinnerContainer = styled.div<Props>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
`;
