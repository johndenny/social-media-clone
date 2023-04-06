import React from "react";
import { ActivityCountsType } from ".";
import {
  CountContainer,
  CommentsSprite,
  LikesSprite,
  TaggedSprite,
  FollowSprite,
} from "./styled";

interface Props {
  counts: ActivityCountsType;
}

export const Content: React.FC<Props> = ({ counts }) => {
  return (
    <>
      {counts?.comments !== 0 && (
        <CountContainer>
          <CommentsSprite></CommentsSprite>
          {counts.comments}
        </CountContainer>
      )}
      {counts?.likes !== 0 && (
        <CountContainer>
          <LikesSprite></LikesSprite>
          {counts.likes}
        </CountContainer>
      )}
      {counts?.tagged !== 0 && (
        <CountContainer>
          <TaggedSprite></TaggedSprite>
          {counts.tagged}
        </CountContainer>
      )}
      {counts?.follows + counts?.followRequests !== 0 && (
        <CountContainer>
          <FollowSprite></FollowSprite>
          {counts.follows + counts.followRequests}
        </CountContainer>
      )}
    </>
  );
};
