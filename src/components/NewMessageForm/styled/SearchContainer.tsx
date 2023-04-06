import styled from "styled-components";

interface Props {}

export const SearchContainer = styled.div<Props>`
  flex-direction: row;
  align-items: flex-start;
  padding: 8px;
  border-bottom: 1px solid rgb(var(--stroke));
  max-height: 40%;
  overflow-y: auto;
`;
