import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  border: 0.5px solid rgb(var(--stroke));
  height: 100%;
  width: 100%;
  position: absolute;
  pointer-events: none;
`;
