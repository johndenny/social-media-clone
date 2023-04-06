import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  && {
    color: rgb(38, 38, 38);
  }
  background-color: transparent;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  text-overflow: ellipsis;
  max-width: 250px;
`;
