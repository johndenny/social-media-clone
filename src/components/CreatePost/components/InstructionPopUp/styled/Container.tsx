import styled, { keyframes } from "styled-components";

interface Props {
  isClosing: boolean;
  type: "gallery" | "tags";
}

const scaleUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
`;

const scaleDown = keyframes`
  from {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0);
  }
`;

export const Container = styled.div<Props>`
  padding: 10px 16px;
  background-color: rgba(32, 32, 32, 0.95);
  border-radius: 6px;
  position: absolute;
  margin-bottom: 12px;
  color: rgb(var(--primary-background));
  white-space: nowrap;
  transform: translateX(-50%);
  font-size: 16px;
  animation: ${(props) => (props.isClosing ? scaleDown : scaleUp)} 0.3s
    ease-in-out;
  animation-fill-mode: forwards;
  transform-origin: bottom;
  z-index: 3;

  ${(props) =>
    props.type === "gallery" && {
      bottom: "0",
    }}

  ${(props) =>
    props.type === "tags" && {
      top: "36px",
    }}
`;
