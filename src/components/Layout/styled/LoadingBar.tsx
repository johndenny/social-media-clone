import styled, { keyframes } from "styled-components";

interface Props {}

const LoadingBarProgress = keyframes`
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 250% 0%;
  }
`;

const LoadingBarEnter = keyframes`
  from {
    max-width: 0%;
  }
  to {
    max-width: 100%;
  }
`;

export const LoadingBar = styled.div<Props>`
  animation: 2s linear infinite ${LoadingBarProgress},
    0.5s ease-out ${LoadingBarEnter};
  background: var(--cyan-5)
    linear-gradient(
      to right,
      var(--cyan-5),
      var(--purple-5),
      var(--orange-5),
      var(--green-5),
      var(--cyan-5)
    );
  background-size: 500%;
  height: 3px;
  transform-origin: left;
  width: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 12;
`;
