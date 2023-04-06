import styled from "styled-components";

interface Props {}

export const InputStyled = styled.input<Props>`
  && {
    font-size: 16px;
  }

  background: transparent;
  border: 1px solid rgb(var(--stroke));
  border-radius: 3px;
  box-sizing: border-box;
  color: rgb(var(--primary-text));
  flex: 0 1 355px;
  font-weight: 400;
  height: 32px;
  padding: 0 10px;
  width: 100%;
  ::placeholder {
    font-weight: 300;
  }
`;
