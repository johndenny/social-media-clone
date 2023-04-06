import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  selected: boolean;
}

export const ListLink = styled(Link)<Props>`
  display: block;
  padding: 16px;
  padding-left: 32px;
  font-weight: 400;
  font-size: 16px;
  :hover {
    ${(props) =>
      !props.selected && {
        backgroundColor: "rgb(var(--secondary-background))",
        borderLeft: "2px solid rgb(var(--stroke))",
        paddingLeft: "calc(32px - 2px)",
      }}
  }
  ${(props) =>
    props.selected && {
      borderLeft: "2px solid rgb(var(--primary-text))",
      paddingLeft: "calc(32px - 2px)",
      fontWeight: "600",
    }}
`;
