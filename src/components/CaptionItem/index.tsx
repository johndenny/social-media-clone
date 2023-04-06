import React from "react";
import { commentDate } from "../../utils/DateFormat";
import { PostValues } from "../PostItem";
import { ProfilePhoto } from "../ProfilePhoto";
import { TextLinkFilter } from "../TextLinkFilter";
import { UsernameLink } from "../UsernameLink";
import { Container, TextContainer, SecondaryText } from "./styled";

interface Props {
  post: PostValues;
}

export const CaptionItem: React.FC<Props> = ({ post }) => {
  const { postedBy, text, createdAt, isEdited } = post;
  return (
    <Container>
      <ProfilePhoto
        height="32px"
        id={postedBy.id}
        photoVersion={postedBy.photoVersion}
        username={postedBy.username}
      />
      <TextContainer>
        <span>
          <UsernameLink username={postedBy.username} isInline />{" "}
          <TextLinkFilter text={text} />
        </span>
        <SecondaryText>
          {isEdited && "Edited • "}
          <time>{commentDate(createdAt)}</time>
        </SecondaryText>
      </TextContainer>
    </Container>
  );
};
