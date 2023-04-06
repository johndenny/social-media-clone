import styled from "styled-components";

interface Props {}

export const Button = styled.button<Props>`
  margin-top: auto;
  max-height: 44px;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-weight: 600;
  border-top: 1px solid rgb(var(--stroke));
  &:hover {
    background-color: rgb(var(--secondary-background));
  }
  &:active {
    opacity: 0.7;
  }
`;
