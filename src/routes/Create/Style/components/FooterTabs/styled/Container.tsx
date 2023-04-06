import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  background-color: rgb(var(--primary-background));
  border: 0;
  bottom: 0;
  height: 44px;
  left: 0;
  position: fixed;
  right: 0;
  top: auto;
  z-index: 10;
  align-items: center;
  display: flex;
  flex-direction: row;
`;
