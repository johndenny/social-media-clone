import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  selected?: boolean;
}

export const StyledLink = styled(Link)<Props>`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  height: 52px;
  text-transform: uppercase;
  border-top: ${(props) =>
    props.selected ? "1px solid #262626" : "1px solid transparent"};

  && {
    color: ${(props) => (props.selected ? "#262626" : "#8e8e8e")};
  }

  @media (max-width: 735px) {
    flex: 1;
    height: 44px;
    border: 0;
  }
`;
