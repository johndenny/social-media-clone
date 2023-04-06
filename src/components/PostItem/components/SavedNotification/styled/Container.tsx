import styled, { keyframes } from "styled-components";

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface Props {
  isClosing: boolean;
}

export const Container = styled.div<Props>`
  flex-direction: row;
  justify-content: space-between;
  font-size: 15px;
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-100%);
  background-color: rgb(var(--primary-background));
  border-top: 1px solid rgb(var(--stroke));
  border-bottom: 1px solid rgb(var(--stroke));
  animation: ${(props) => (props.isClosing ? FadeOut : FadeIn)} 0.3s ease-in-out;
  animation-fill-mode: forwards;
  white-space: nowrap;
  gap: 8px;
`;
