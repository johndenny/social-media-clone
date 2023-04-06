import styled from "styled-components";
import spriteCore from "../../../../../assets/images/sprite_core.png";

interface Props {
  right?: boolean;
}

export const ChevronSprite = styled.div<Props>`
  background-image: url(${spriteCore});
  background-position: -97px -333px;
  height: 24px;
  width: 24px;
  transform: scale(${(props) => props.right && -1});
`;
