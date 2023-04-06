import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  align-items: center;
  background-color: rgb(var(--primary-background));
  border-bottom: 1px solid rgb(var(--stroke));
  box-sizing: border-box;
  height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
`;
