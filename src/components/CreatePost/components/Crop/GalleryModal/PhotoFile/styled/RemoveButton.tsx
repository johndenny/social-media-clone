import styled from "styled-components";

interface Props {}

export const RemoveButton = styled.button<Props>`
  padding: 4px;
  margin: 4px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 50%;
  z-index: 3;
  position: absolute;
  right: 6px;
  top: 0;
  transition: all 0.2s;
  :hover {
    opacity: 0.7;
  }
`;
