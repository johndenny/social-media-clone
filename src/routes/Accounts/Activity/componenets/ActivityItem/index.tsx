import React, { useLayoutEffect, useState } from "react";
import { PostValues } from "../../../../../components/PostItem";
import { ProfilePhoto } from "../../../../../components/ProfilePhoto";
import { CommentType } from "../../../../Post/Comments";
import {
  Container,
  ListItem,
  ProfilePhotoContainer,
  SectionTitle,
  TextContainer,
  Time,
} from "./styled";
import { activityTime, commentDate } from "../../../../../utils/DateFormat";
import { Img } from "../../../styled";
import { cld } from "../../../../../utils/cloudinaryConfig";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { MoreText } from "../../../../../components/MoreText";
import { PreloadLink } from "../../../../../components/PreloadLink";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../../context/GlobalContext";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { FollowButton } from "../../../../../components/FollowButton";
import { ReplyType } from "../../../../../components/CommentItem/ReplyItem";
import { UserListI } from "../../../../../types";
import { UseQueryState } from "urql";
import { ActivityPageVariablesI } from "../ActivityPage";

export type ActivityItemType = {
  id: string;
  createdAt: string;
  isRead: boolean;
  type: string;
  sentBy: UserListI;
  post: PostValues;
  reply: ReplyType;
  comment: CommentType;
};

interface Props {
  activityItem: ActivityItemType;
  titlesRef: React.MutableRefObject<string[]>;
  resultActivity: UseQueryState<any, string | ActivityPageVariablesI>;
}

export const ActivityItem: React.FC<Props> = ({
  activityItem,
  titlesRef,
  resultActivity,
}) => {
  const { user, resultPost, activityDate } =
    useGlobalContext() as globalContextType;
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const { sentBy } = activityItem;
  const title = !activityItem?.isRead
    ? "New"
    : activityTime(activityItem.createdAt);

  useLayoutEffect(() => {
    if (
      (resultActivity.operation?.variables as ActivityPageVariablesI)?.date !==
      activityDate
    )
      return;

    const titleIndex = titlesRef.current.findIndex(
      (activityTitle) => activityTitle === title
    );

    if (titleIndex !== -1) return;

    titlesRef.current = [...titlesRef.current, title];
    setIsTitleVisible(true);
  }, []);

  return (
    <ListItem>
      {isTitleVisible && <SectionTitle>{title}</SectionTitle>}

      <Container>
        <ProfilePhotoContainer>
          <ProfilePhoto height={"44px"} isWithoutModal={true} {...sentBy} />
        </ProfilePhotoContainer>
        <TextContainer>
          <span>
            <PreloadLink
              to={`/${sentBy.username}`}
              query={PreloadQuery.user}
              queryResult={user}
              variables={{}}
            >
              {sentBy.username}
            </PreloadLink>

            {activityItem.type === "like" &&
              !activityItem.comment &&
              ` liked your photo.`}
            {activityItem.type === "like" && activityItem.comment && (
              <>
                {` liked your comment: `}
                <MoreText text={activityItem.comment.text} />
              </>
            )}
            {activityItem.type === "like" && activityItem.reply && (
              <>
                {` liked your comment: `}
                <MoreText text={activityItem.reply.text} />
              </>
            )}
            {activityItem.type === "tagged" && ` tagged you in a post.`}
            {activityItem.type === "comment" && (
              <>
                {` commented: `}
                <MoreText text={activityItem.comment.text} />
              </>
            )}
            {activityItem.type === "comment-mention" && activityItem.comment && (
              <>
                {` mentioned you in a comment: `}
                <MoreText text={activityItem.comment.text} />
              </>
            )}
            {activityItem.type === "comment-mention" && activityItem.reply && (
              <>
                {` mentioned you in a comment: `}
                <MoreText text={activityItem.reply.text} />
              </>
            )}
            {activityItem.type === "post-mention" && (
              <>
                {` mentioned you in a post: `}
                <MoreText text={activityItem.post.text} />
              </>
            )}
            {activityItem.type === "follow" && ` is following you.`}
            <Time>{commentDate(activityItem.createdAt)}</Time>
          </span>
        </TextContainer>

        {activityItem.type === "follow" ? (
          <FollowButton followingId={sentBy.id} user={sentBy} />
        ) : (
          <PreloadLink
            to={`/p/${activityItem.post?.id}`}
            query={PreloadQuery.post}
            queryResult={resultPost}
            variables={{ postId: activityItem.post?.id }}
          >
            <Img
              alt={`post from ${activityItem.post?.postedBy.username}`}
              src={cld
                .image(activityItem.post?.photos[0].id)
                .resize(thumbnail().width(40).height(40))
                .toURL()}
            />
          </PreloadLink>
        )}
      </Container>
    </ListItem>
  );
};
