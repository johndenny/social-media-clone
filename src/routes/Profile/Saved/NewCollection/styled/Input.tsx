import styled from "styled-components";

interface Props {}

export const Input = styled.input<Props>`
  background: rgba(var(--secondary-background), 1);
  border: 1px solid rgb(var(--stroke));
  border-radius: 6px;
  flex: 1 0 auto;
  margin: 0;
  outline: 0;
  padding: 4px 9px;
  font-size: 14px;
  line-height: 30px;

  ::placeholder {
    color: rgb(var(--tertiary-text));
  }
`;
