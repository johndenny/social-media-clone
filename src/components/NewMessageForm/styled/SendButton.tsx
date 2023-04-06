import styled from "styled-components";

interface Props {}

export const SendButton = styled.button<Props>`
  width: 100%;
  justify-content: center;
  font-weight: 600;
  color: rgb(var(--primary-background));
  background-color: rgb(var(--primary-button));
  border-radius: 4px;
  padding: 14px;
  :disabled {
    opacity: 0.3;
  }
`;
