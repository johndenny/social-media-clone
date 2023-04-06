import styled from "styled-components";
import spriteCoreV3 from "../../../assets/images/sprite_core_v3.png";

interface Props {}

export const SearchIcon = styled.span<Props>`
  background-image: url(${spriteCoreV3});
  background-repeat: no-repeat;
  background-size: 553px 528px;
  background-position: -320px -207px;
  height: 10px;
  width: 10px;
`;
