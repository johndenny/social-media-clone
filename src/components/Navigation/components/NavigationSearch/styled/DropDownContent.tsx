import styled, { css, keyframes } from "styled-components";

const SlideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

interface Props {
  isAnimating: boolean;
}

export const DropDownContent = styled.div<Props>`
  background-color: rgb(var(--primary-background));
  border-radius: 6px;
  position: absolute;
  z-index: 3;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.0975));
  width: 100%;
  animation: ${(props) =>
    props.isAnimating &&
    css`
      ${SlideUp} .1s ease-in
    `};
  animation-fill-mode: forwards;
`;
