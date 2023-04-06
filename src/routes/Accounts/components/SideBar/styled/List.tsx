import styled from "styled-components";

interface Props {}

export const List = styled.ul<Props>`
  border-right: 1px solid rgb(var(--stroke));
  display: flex;
  flex-basis: 236px;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
