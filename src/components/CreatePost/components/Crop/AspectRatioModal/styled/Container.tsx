import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 8px;
  align-items: flex-start;
  z-index: 3;
`;
