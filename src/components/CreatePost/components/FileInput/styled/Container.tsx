import styled, { keyframes } from "styled-components";

interface Props {}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div<Props>`
  gap: 24px;
  padding: 24px;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  animation: ${fadeIn} 0.4s linear;
`;
