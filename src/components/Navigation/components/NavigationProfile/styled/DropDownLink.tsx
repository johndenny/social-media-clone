import styled from "styled-components";

interface Props {}

export const DropDownLink = styled.div<Props>`
  cursor: pointer;
  :hover {
    background-color: rgb(var(--secondary-background));
  }
  :active {
    opacity: 0.7;
  }
  padding: 10px 16px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-weight: 400;
  color: rgb(var(--primary-text));
`;
