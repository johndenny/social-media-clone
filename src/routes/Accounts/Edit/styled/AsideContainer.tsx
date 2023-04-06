import styled from "styled-components";

interface Props {}

export const AsideContainer = styled.div<Props>`
  @media (min-width: 736px) {
    flex-direction: row;
    :last-child {
      margin-top: 25px;
    }
  }
  margin-bottom: 16px;
`;
