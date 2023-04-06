import styled, { keyframes } from "styled-components";

interface Props {
  isAnimating: boolean;
}

const slideDown = keyframes`
  from {
  }
  to {
    transform: translateY(16px);
    opacity: 0;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(16px);
    opacity: 0;
  }
  to {
transform: translateY(0);
opacity: 1;
  }
`;

export const Padding = styled.div<Props>`
  padding: 8px;
  animation: ${(props) => (props.isAnimating ? slideDown : slideUp)} 0.2s
    ease-in-out;
  animation-fill-mode: forwards;
`;
