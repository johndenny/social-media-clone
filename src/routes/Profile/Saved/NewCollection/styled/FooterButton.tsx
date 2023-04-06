import styled from "styled-components";

interface Props {}

export const FooterButton = styled.button<Props>`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-top: 1px solid rgb(var(--stroke));
  font-weight: 600;
  color: rgb(var(--primary-button));
  :disabled {
    color: rgba(var(--primary-button), 0.3);
  }
  :active {
    background-color: rgb(var(--highlight-background));
  }
`;
