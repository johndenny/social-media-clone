import { Link } from "react-router-dom";
import styled from "styled-components";
import { PreloadLink } from "../../../../../components/PreloadLink";

interface Props {
  selected?: boolean;
}

export const StyledPreload = styled(PreloadLink)<Props>`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  height: 52px;
  text-transform: uppercase;
  box-shadow: ${(props) => (props.selected ? "0 -1px 0 #262626" : "")};

  && {
    color: ${(props) => (props.selected ? "#262626" : "#8e8e8e")};
  }
  @media (max-width: 735px) {
    flex: 1;
    height: 44px;
    border: 0;
    box-shadow: ${(props) =>
      props.selected ? "0 -1px 0 rgb(var(--primary-button))" : ""};
  }
`;
