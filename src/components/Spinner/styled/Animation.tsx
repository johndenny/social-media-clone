import styled, { keyframes } from "styled-components";

export const SpinnerSpin = keyframes`
  0% { transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

export const Animation = styled.div`
  animation: ${SpinnerSpin} 1.2s steps(12) infinite;
`;
