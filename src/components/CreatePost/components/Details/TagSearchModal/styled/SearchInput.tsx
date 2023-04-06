import styled from "styled-components";

interface Props {}

export const SearchInput = styled.input<Props>`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  :focus {
    ::placeholder {
      color: rgb(var(--tertiary-text));
    }
  }
`;
