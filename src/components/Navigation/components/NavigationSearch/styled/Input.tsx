import styled from "styled-components";

interface Props {}

export const Input = styled.input<Props>`
  color: rgb(var(--primary-text));
  appearance: none;
  background-color: rgb(var(--highlight-background));
  border: 0;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  height: 100%;
  outline: none;
  padding: 3px 16px;
  width: 100%;
  z-index: 2;
  ::placeholder {
    font-weight: 300;
    color: rgb(var(--secondary-text));
  }
`;
