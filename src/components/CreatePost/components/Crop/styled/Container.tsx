import styled, { keyframes } from "styled-components";

interface Props {
  isFirstLoad: boolean;
  isDisplay: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div<Props>`
  align-items: center;
  justify-content: center;
  user-select: none;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  animation: ${(props) => (props.isFirstLoad ? fadeIn : null)} 0.2s linear;
  background-color: rgb(var(--secondary-background));
  display: ${(props) => (props.isDisplay ? "none" : "flex")};
`;
