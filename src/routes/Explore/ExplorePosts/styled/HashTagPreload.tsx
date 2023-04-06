import styled from "styled-components";
import { PreloadLink } from "../../../../components/PreloadLink";

interface Props {}

export const HashTagPreload = styled(PreloadLink)<Props>`
  border: 1px solid rgb(var(--stroke));
  padding: 5px 9px;
  border-radius: 4px;
`;
