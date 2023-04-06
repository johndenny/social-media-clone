import styled from "styled-components";

interface Props {}

export const Header = styled.header<Props>`
  flex-direction: row;
  padding: 12px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(var(--stroke));
  font-weight: 600;
  font-size: 16px;
`;
