import styled from "styled-components";

interface Props {}

export const Margin = styled.div<Props>`
  @media (max-width: 736px) {
    margin: 2px 20px 0 20px;
  }
  @media (min-width: 736px) {
    margin: 2px 32px 0 124px;
  }
`;
