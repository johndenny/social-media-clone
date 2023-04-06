import styled from "styled-components";
import spriteCoreV3 from "../../../../assets/images/sprite_core_v3.png";

interface Props {}

export const FollowersIcon = styled.span<Props>`
  background-image: url(${spriteCoreV3});
  background-repeat: no-repeat;
  background-size: 553px 528px;
  background-position: -145px 0;
  height: 96px;
  width: 96px;
`;
