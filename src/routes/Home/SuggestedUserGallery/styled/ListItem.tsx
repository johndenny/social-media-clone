import styled, { keyframes } from "styled-components";

interface Props {
  animate?: boolean;
}

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const ListItem = styled.li<Props>`
  position: absolute;
  animation: ${(props) => (props.animate ? fadeOut : undefined)} 0.3s ease;
  animation-fill-mode: forwards;
`;
