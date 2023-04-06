import styled from "styled-components";
import { PreloadLink } from "../../PreloadLink";

interface Props {}

export const CommentsPreload = styled(PreloadLink)<Props>`
  &&:visited {
    color: rgb(var(--secondary-text));
  }
  && {
    color: rgb(var(--secondary-text));
  }
  font-weight: 400;
`;
