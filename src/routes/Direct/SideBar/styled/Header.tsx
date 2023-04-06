import styled from "styled-components";

interface Props {}

export const Header = styled.header<Props>`
  border-bottom: 1px solid rgb(var(--stroke));
  font-size: 16px;
  font-weight: 600;
  height: 60px;
  width: 100%;
  z-index: 2;
  flex-direction: row;
  align-items: center;
`;
