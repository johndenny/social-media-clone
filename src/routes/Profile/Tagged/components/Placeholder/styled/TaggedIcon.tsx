import styled from "styled-components";
import spriteV3 from "../../../../../../assets/images/sprites_v3.png";

interface Props {}

export const TaggedIcon = styled.div<Props>`
  background-image: url(${spriteV3});
  background-size: 440px 411px;
  background-position: -189px -288px;
  background-repeat: no-repeat;
  height: 62px;
  width: 62px;
`;
