import styled from "styled-components";

interface Props {}

export const CircleMask = styled.div<Props>`
  background: radial-gradient(
    circle at center,
    transparent 0,
    transparent 69.9%,
    black 70%,
    black 100%
  );
  opacity: 0.5;
  padding-bottom: 100%;
  pointer-events: none;
  position: relative;
  z-index: 1;
`;
