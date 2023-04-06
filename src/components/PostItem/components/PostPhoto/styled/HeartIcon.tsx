import styled from "styled-components";
import spriteV3 from "../../../../../assets/images/sprites_v3.png";

interface Props {}

export const HeartIcon = styled.span<Props>`
  background-image: url(${spriteV3});
  background-size: 440px 411px;
  background-position: 0 0;
  background-repeat: no-repeat;
  height: 128px;
  width: 128px;
`;
