import styled from "styled-components";
import { PreloadLink } from "../../PreloadLink";

interface Props {}

export const StyledPreloadLink = styled(PreloadLink)<Props>`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;
