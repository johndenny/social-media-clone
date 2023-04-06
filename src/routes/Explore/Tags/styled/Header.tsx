import styled from "styled-components";

interface Props {}

export const Header = styled.header<Props>`
  flex-direction: row;
  margin: 31px 16px;
  gap: 16px;
  align-items: center;
  font-size: 16px;

  @media (min-width: 736px) {
    gap: 32px;
    margin: 56px 32px;
  }
`;
