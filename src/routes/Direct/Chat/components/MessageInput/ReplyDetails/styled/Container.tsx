import styled, { keyframes } from "styled-components";

interface Props {
  isClosing: boolean;
}

const slideUp = keyframes`
  from {
    max-height: 0;
  }
  to {
    max-height: 100%;
  }
`;

const slideDown = keyframes`
  from {
    max-height: 100%;
  }
  to {
    max-height: 0;
  }
`;

export const Container = styled.div<Props>`
  padding: 0 16px 0 16px;
  flex-direction: row;
  border-top: 1px solid rgb(var(--stroke));
  align-items: center;
  overflow: hidden;
  animation: ${(props) => (props.isClosing ? slideDown : slideUp)} 0.3s
    ease-in-out;
  animation-fill-mode: forwards;
`;
