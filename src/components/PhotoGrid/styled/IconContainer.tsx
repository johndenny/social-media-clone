import styled from "styled-components";

interface Props {}

export const IconContainer = styled.div<Props>`
  position: absolute;
  right: 0;
  padding: 16px;
  @media (max-width: 735px) {
    padding: 4px;
  }
`;
