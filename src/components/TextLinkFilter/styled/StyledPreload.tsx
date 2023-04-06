import styled from "styled-components";
import { PreloadLink } from "../../PreloadLink";

interface Props {}

export const StyledPreload = styled(PreloadLink)<Props>`
  && {
    color: rgb(var(--link-blue));
    font-weight: 400;
  }
`;
