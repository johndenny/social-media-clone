import styled, { keyframes } from "styled-components";

interface Props {}

const dropIn = keyframes`
  from {
    transform: scale(1.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const FileLimitWarning = styled.div<Props>`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 400;
  background-color: rgba(26, 26, 26, 0.7);
  border-radius: 8px;
  position: absolute;
  z-index: 3;
  color: rgb(var(--primary-background));
  animation: ${dropIn} 0.3s ease-in-out;
  animation-fill-mode: forwards;
`;
