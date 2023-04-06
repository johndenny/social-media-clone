import styled from "styled-components";
import { PreloadLink } from "../../PreloadLink";

interface Props {}

export const SecondaryPreload = styled(PreloadLink)<Props>`
  && {
    color: rgb(var(--secondary-text));
    font-weight: 400;
  }
`;
