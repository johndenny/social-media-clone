import styled from "styled-components";
import { PreloadLink } from "../../PreloadLink";

interface Props {}

export const StyledPreload = styled(PreloadLink)<Props>`
  &:visited {
    color: rgb(var(--primary-text));
  }
  color: rgb(var(--primary-text));
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`;
