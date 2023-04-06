import styled from "styled-components";
import sprites from "../../../assets/images/sprite_glyphs.png";

interface Props {}

export const LockSprite = styled.div<Props>`
  background-image: url(${sprites});
  background-repeat: no-repeat;
  background-position: -468px -486px;
  width: 24px;
  height: 24px;
`;
