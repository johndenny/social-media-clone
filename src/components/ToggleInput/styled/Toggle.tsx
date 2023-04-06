import styled from "styled-components";
import { Input } from "./Input";

interface Props {}

export const Toggle = styled.span<Props>`
  background-color: rgb(var(--secondary-text));

  border-radius: 28px;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.4s;

  ::before {
    content: "";
    background-color: rgb(var(--primary-background));
    border-radius: 50%;
    position: absolute;
    bottom: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    transition: all 0.4s;
  }
`;
