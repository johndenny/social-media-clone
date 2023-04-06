import styled from "styled-components";
import { Button } from "../../../../styled";

interface Props {
  left?: string;
  right?: string;
}

export const EditButton = styled(Button)<Props>`
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  background-color: transparent;
  border: none;
  bottom: 16px;
  outline: none;
  padding: 0;
  position: absolute;
  z-index: 2;
`;
