import styled from "styled-components";
import spriteCore from "../../../../../assets/images/sprite_core.png";

interface Props {}

export const ClearSprite = styled.div<Props>`
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: -318px -333px;
  height: 20px;
  width: 20px;
  background-image: url(${spriteCore});
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
`;
