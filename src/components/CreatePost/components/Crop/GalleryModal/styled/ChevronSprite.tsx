import styled from "styled-components";
import SpriteGlyphs from "../../../../../../assets/images/sprite_glyphs.png";

interface Props {
  right?: boolean;
  left?: boolean;
}

export const ChevronSprite = styled.div<Props>`
  background-image: url(${SpriteGlyphs});
  background-repeat: no-repeat;
  background-position: -294px
    ${(props) => (props.right && "-273px") || (props.left && "-226px")};
  height: 45px;
  width: 45px;
`;
