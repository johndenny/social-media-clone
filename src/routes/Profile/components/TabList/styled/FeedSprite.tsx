import styled from "styled-components";
import { CoreSpritesV3 } from "../../../../../styled/CoreSpritesV3";

interface IFeedSprite {
  selected: boolean;
}

export const FeedSprite = styled(CoreSpritesV3)<IFeedSprite>`
  display: block;
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  background-size: 553px 528px;
  background-position: ${(props) =>
    props.selected ? "-175px -504px" : "-200px -504px"};
`;
