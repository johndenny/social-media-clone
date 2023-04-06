import styled, { keyframes } from "styled-components";

interface Props {}

const scaleDown = keyframes`
  from {
    opacity: 0;
    transform: scale(1.1)
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const PostAnimation = styled.div<Props>`
  animation: ${scaleDown} 0.1s ease-in-out;
  width: 100%;
`;
