import styled from "styled-components";

interface Props {}

export const Header = styled.header<Props>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 16px;
  font-size: 16px;
  font-weight: 600;
`;
