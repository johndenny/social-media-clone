import styled from "styled-components";
import { Button } from "../../../styled";

interface Props {
  color: string;
  weight?: string;
}

export const ModalButton = styled(Button)<Props>`
  color: rgb(var(${(props) => props.color}));
  font-weight: ${(props) => (props.weight ? props.weight : null)};
  border-top: 1px solid rgb(var(--stroke));
  min-height: 48px;
  padding: 4px 8px;
  text-align: center;
  user-select: none;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  :active {
    background-color: rgb(var(--highlight-background));
  }
`;
