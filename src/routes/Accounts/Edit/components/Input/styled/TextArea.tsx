import styled from "styled-components";

interface Props {}

export const TextArea = styled.textarea<Props>`
  font-size: 16px;
  background: transparent;
  border: 1px solid rgb(var(--stroke));
  border-radius: 3px;
  box-sizing: border-box;
  color: rgb(var(--primary-text));
  flex: 0 1 355px;
  font-weight: 300;
  height: 60px;
  padding: 6px 10px;
  width: 100%;
  resize: vertical;
`;
