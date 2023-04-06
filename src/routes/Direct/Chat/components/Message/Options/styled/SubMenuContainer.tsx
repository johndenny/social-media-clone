import styled, { keyframes } from "styled-components";

interface Props {
  isClosing?: boolean;
}

const slideIn = keyframes`
  from {
    max-width: 0;
  }
  to {
    max-width: 100%;
  }
`;

const slideOut = keyframes`
  from {
    max-width: 100%;
  }
  to {
    max-width: 0;
  }
`;

export const SubMenuContainer = styled.div<Props>`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgb(var(--secondary-text));
  align-self: center;
  animation: ${(props) => (props.isClosing ? slideOut : slideIn)} 0.2s
    ease-in-out;
  animation-fill-mode: forwards;
  max-width: 50%;
  overflow: hidden;
`;
