import styled from "styled-components";

interface Props {}

export const Button = styled.button<Props>`
  cursor: text;
  background-color: rgb(var(--highlight-background));
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 0 16px;
  color: rgb(var(--secondary-text));
  font-weight: 300;
  justify-content: center;
  left: 0;
  position: absolute;
  text-align: left;
  top: 0;
  z-index: 2;
  border-radius: 8px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  line-height: 25px;
`;
