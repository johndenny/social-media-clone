import styled from "styled-components";

interface Props {}

export const MenuButton = styled.button<Props>`
  padding: 12px 16px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid rgb(var(--secondary-text));
  :last-child {
    border-bottom: 0;
  }
`;
