import styled from "styled-components";

interface Props {}

export const Padding = styled.div<Props>`
  @media (min-width: 736px) {
    flex-basis: 355px;
  }
  @media (max-width: 735px) {
    padding: 0 20px;
  }
`;
