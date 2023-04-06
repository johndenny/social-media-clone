import styled, { keyframes } from "styled-components";

interface Props {
  isClicked: boolean;
}

export const LikePop = keyframes`
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
`;

export const LikeAnimation = styled.div<Props>`
  animation: ${(props) => (props.isClicked ? LikePop : null)} 0.2s ease-in-out;
`;
