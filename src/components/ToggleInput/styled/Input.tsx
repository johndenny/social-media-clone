import styled from "styled-components";
import { Toggle } from "./Toggle";

interface Props {}

export const Input = styled.input<Props>`
  &:checked + ${Toggle} {
    background-color: rgb(var(--primary-button));
  }
  &:checked + ${Toggle}::before {
    transform: translateX(16px);
  }
  height: 0;
  opacity: 0;
  width: 0;
`;
