import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  overflow: hidden;
`;
