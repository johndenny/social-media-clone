import styled from "styled-components";

interface Props {}

export const SubMenuButton = styled.button<Props>`
  font-size: 12px;
  color: rgb(var(--secondary-text));
  :hover {
    color: rgb(var(--primary-text));
  }
  :first-child {
    margin-left: 6px;
  }
  :last-child {
    margin-right: 6px;
  }
`;
