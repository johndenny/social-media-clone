import styled from "styled-components";
import spriteCoreV3 from "../../../assets/images/sprite_core_v3.png";

interface Props {}

export const ClearIcon = styled.span<Props>`
  background-image: url(${spriteCoreV3});
  background-repeat: no-repeat;
  background-size: 553px 528px;
  background-position: -529px -400px;
  height: 20px;
  width: 20px;
`;
