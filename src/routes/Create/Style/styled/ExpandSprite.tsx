import styled from "styled-components";
import spritePhotoEdit from "../../../../assets/images/sprite_photo_edit.png";

interface Props {}

export const ExpandSprite = styled.span<Props>`
  background-image: url(${spritePhotoEdit});
  background-size: 89px 89px;
  background-position: -59px 0;
  background-repeat: no-repeat;
  height: 30px;
  width: 30px;
  display: block;
  overflow: hidden;
  text-indent: 110%;
  white-space: nowrap;
`;
