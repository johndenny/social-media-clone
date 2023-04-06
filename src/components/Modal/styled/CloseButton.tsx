import styled from "styled-components";

interface Props {}

export const CloseButton = styled.button<Props>`
  padding: 16px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  :active {
    opacity: 0.7;
  }
`;
