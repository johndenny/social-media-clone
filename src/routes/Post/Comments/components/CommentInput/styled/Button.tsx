import styled from "styled-components";

interface Props {
  isWide: boolean | undefined;
}

export const Button = styled.button<Props>`
  :disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  padding: ${(props) => (props.isWide ? "8px 12px" : null)};
  color: rgb(var(--primary-button));
  font-weight: 600;
  cursor: pointer;
`;
