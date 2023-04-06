import styled from "styled-components";

interface Props {}

export const UnorderedList = styled.ul<Props>`
  margin-bottom: 20px;
  display: flex;
  gap: 40px;
  flex-direction: row;
  list-style: none;
  font-size: 16px;
  a,
  a:visited {
    color: var(--primary-text);
  }
`;
