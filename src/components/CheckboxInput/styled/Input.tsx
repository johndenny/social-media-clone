import styled from "styled-components";
import { Checkbox } from "./Checkbox";

interface Props {}

export const Input = styled.input<Props>`
  &:checked + ${Checkbox}::before {
    border-bottom: 2px solid rgb(var(--primary-text));
    border-left: 2px solid rgb(var(--primary-text));
    content: "";
    display: block;
    height: 3px;
    width: 8px;
    left: 2px;
    top: 3px;
    position: absolute;
    transform: rotateZ(-45deg);
  }

  &:focus + ${Checkbox} {
    border-color: rgb(var(--primary-button));
  }

  height: 0;
  width: 0;
  opacity: 0;
  margin: 0;
`;
