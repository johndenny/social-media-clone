import styled from "styled-components";

interface Props {}

export const TextArea = styled.textarea<Props>`
  padding: 0 16px;
  background: transparent;
  border: none;
  outline: none;
  overflow: auto;
  resize: none;
  height: 168px;
  font-size: 16px;
  line-height: 24px;
  :focus {
    ::placeholder {
      color: rgb(var(--tertiary-text));
    }
  }
`;
