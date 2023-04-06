import styled from "styled-components";

interface Props {
  height: number;
}

export const TextArea = styled.textarea.attrs<Props>((props) => ({
  style: {
    height: `${props.height}px`,
  },
}))<Props>`
  resize: none;
  border: 0;
  outline: none;
  max-height: 80px;
  display: flex;
  flex: 1;
  line-height: 18px;
  padding: 0;
  ::placeholder {
    color: rgb(var(--secondary-text));
  }
  :focus::placeholder {
    color: rgb(var(--stroke));
  }
`;
