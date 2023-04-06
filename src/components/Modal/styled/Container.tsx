import styled, { keyframes } from "styled-components";

export const modalShow = keyframes`
  from {
    opacity: 0;
    transform: scale(1.125);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

interface Props {}

export const Container = styled.div<Props>`
  width: calc(100% - 88px);
  flex-shrink: 1;
  justify-content: center;
  margin: 20px;
  max-height: calc(100% - 40px);
  background-color: rgb(var(--primary-background));
  border-radius: 12px;
  overflow: hidden;
  max-height: 100%;
  animation: ${modalShow} 0.1s ease-out;
  max-width: 400px;
`;
