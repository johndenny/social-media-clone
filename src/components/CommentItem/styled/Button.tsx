import styled from "styled-components";

interface Props {
  isBold?: boolean;
}

export const Button = styled.button<Props>`
  font-size: 12px;
  font-weight: ${(props) => (props.isBold ? "600" : 400)};
  color: rgb(var(--secondary-text));
  align-items: center;
  cursor: pointer;
`;
