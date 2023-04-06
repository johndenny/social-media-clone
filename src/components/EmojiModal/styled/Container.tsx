import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  align-self: center;
  background: rgb(var(--primary-background));
  border-radius: 6px;
  z-index: 3;
  position: absolute;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.0975));
`;
