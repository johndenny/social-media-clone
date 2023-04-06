import styled from "styled-components";

interface Props {}

export const List = styled.ul<Props>`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  list-style-type: none;
  box-sizing: content-box;
  height: calc(100% - 32px);
  width: calc(100% - 32px);
  position: absolute;
  overflow-y: scroll;
`;
