import styled from "styled-components";
import spriteV3 from "../../../assets/images/sprite_core_v3.png";

interface Props {}

export const TaggedSprite = styled.span<Props>`
  background-image: url(${spriteV3});
  background-size: 553px 528px;
  background-position: -493px -374px;
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
`;
