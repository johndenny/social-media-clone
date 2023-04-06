import styled from "styled-components";
import spriteCore from "../../../../../assets/images/sprite_core.png";

interface Props {}

export const CloseSprite = styled.div<Props>`
  background-image: url(${spriteCore});
  background-position: -387px -321px;
  background-repeat: no-repeat;
  width: 10px;
  height: 10px;
`;
