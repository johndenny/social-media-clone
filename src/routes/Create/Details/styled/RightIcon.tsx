import styled from "styled-components";
import spritesV3 from "../../../../assets/images/sprites_v3.png";

interface Props {}

export const RightIcon = styled.span<Props>`
  background-image: url(${spritesV3});
  background-repeat: no-repeat;
  background-size: 440px 411px;
  background-position: -428px -61px;
  height: 15px;
  width: 12px;
`;
