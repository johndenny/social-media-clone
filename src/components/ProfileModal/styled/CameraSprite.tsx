import styled from "styled-components";
import sprites from "../../../assets/images/sprite_glyphs.png";

interface Props {}

export const CameraSprite = styled.span<Props>`
  background-image: url(${sprites});
  background-repeat: no-repeat;
  background-position: -384px -396px;
  width: 24px;
  height: 24px;
`;
