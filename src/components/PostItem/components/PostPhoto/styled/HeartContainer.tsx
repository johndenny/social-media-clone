import styled, { keyframes } from "styled-components";

interface Props {
  isHeartVisible: boolean;
}

const LikePostPop = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  20% {
    transform: scale(1.2);
    opacity: .85;
  }
  30% {
    transform: scale(1);
    opacity: .85;
  }
  70% {
    transform: scale(1);
    opacity: .85;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

export const HeartContainer = styled.div<Props>`
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.85;
  transform: scale(0);
  pointer-events: none;
  animation: ${(props) => (props.isHeartVisible ? LikePostPop : null)} 1s
    ease-in-out;
`;
