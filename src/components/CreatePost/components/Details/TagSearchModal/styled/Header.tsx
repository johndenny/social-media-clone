import styled from "styled-components";

interface Props {}

export const Header = styled.header<Props>`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgb(var(--stroke));
  gap: 8px;
`;
