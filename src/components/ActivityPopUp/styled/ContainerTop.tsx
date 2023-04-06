import styled, { keyframes } from "styled-components";

interface Props {
  isVisable: boolean;
}

const popUp = keyframes`
  from {
    transform: scale(0) translateY(100%) translateX(-50%);
    opacity: 0
  }
  to {
    transform: scale(1) translateY(0%) translateX(-50%);
    opacity: 1
  }
`;

const popDown = keyframes`

  from {
    transform: scale(1) translateY(0%) translateX(-50%);
    opacity: 1
  }
  to {
    transform: scale(0) translateY(100%) translateX(-50%);
    opacity: 0
  }
`;

export const ContainerTop = styled.div<Props>`
  padding: 12px;
  border-radius: 8px;
  background-color: rgb(var(--badge));
  color: rgb(var(--primary-background));
  position: absolute;
  top: 60px;
  left: 50%;
  flex-direction: row;
  gap: 4px;
  font-weight: 400;
  transform-origin: top left;
  animation: ${(props) => (props.isVisable ? popUp : popDown)} 0.2s ease-in-out;
  animation-fill-mode: forwards;
`;
