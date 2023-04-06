import styled from "styled-components";
import { Button } from "../../../styled";

interface ButtonStyleProps {
  margin?: string;
  padding?: string;
  fetching?: boolean;
  fillType?: "secondary";
}

export const ButtonStyle = styled(Button)<ButtonStyleProps>`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.padding || "5px 9px"};
  background-color: ${(props) =>
    props.fillType === "secondary" ? "transparent" : "#0095f6"};
  border: ${(props) =>
    props.fillType === "secondary"
      ? "1px solid rgb(var(--stroke))"
      : "1px solid transparent"};
  border-radius: 4px;
  color: ${(props) =>
    props.fetching
      ? "transparent"
      : props.fillType === "secondary"
      ? "rgb(var(--primary-text))"
      : "rgb(255, 255, 255)"};
  margin: ${(props) => props.margin || 0};
  :active {
    opacity: 0.7;
  }
`;
