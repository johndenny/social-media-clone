import React, { useEffect, useRef, useState } from "react";
import { MessageProps } from "../..";
import { ProfilePhoto } from "../../../../../components/ProfilePhoto";
import { minutesElapsed } from "../../../../../utils/DateFormat";
import { PostMessage } from "../PostMessage";
import { Image } from "../PostMessage/styled";
import {
  ActivityContainer,
  Bold,
  Container,
  ContentContainer,
  HeartContainer,
  LikeContainer,
  LikeModalButton,
  MarginContainer,
  OuterContainer,
  ProfilePhotoContainer,
  ReplyContainer,
  ReplyText,
  SpacerContainer,
  StickerContainer,
  TextContainer,
  UsernameContainer,
} from "./styled";
import { cld } from "../../../../../utils/cloudinaryConfig";
import { ReactComponent as HeartSvg } from "../../../../../assets/svgs/activitySelected.svg";
import { useMutation } from "urql";
import { LikeMessage, UnlikeMessage } from "../../../../../graphQL/mutations";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../../context/GlobalContext";
import { Options } from "./Options";
import { useDirectContext } from "../../..";
import { ReplySpacer } from "./styled/ReplySpacer";

interface Props {
  message: MessageProps;
  isViewer: boolean;
  nextMessage: MessageProps;
  previousMessage: MessageProps;
}

export const Message = React.memo(function Message({
  previousMessage,
  message,
  isViewer,
  nextMessage,
}: Props) {
  const { openSubMenuId, setOpenSubMenuId } = useDirectContext();
  const {
    setModalAttrs,
    resultUniqueChat,
    viewer,
    setOpenMessageMenuId,
    openMessageMenuId,
  } = useGlobalContext() as globalContextType;
  const [likeResult, likeMutation] = useMutation(LikeMessage);
  const [unlikeResult, unlikeMutation] = useMutation(UnlikeMessage);
  const clickCount = useRef(0);
  const modalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const subMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const isGroup = resultUniqueChat.data?.uniqueChat.members.length > 2;
  const sentBy = message.sentBy.username;
  const sentByFullName = message.sentBy.fullName;
  const sentByVisibleName = sentByFullName ? sentByFullName : sentBy;

  const touchStartHandler = () => {
    clickCount.current += 1;

    modalTimerRef.current = setTimeout(() => {
      setModalAttrs({
        type: "message",
        variables: { id: message.id, text: message.text },
      });
      clickCount.current = 0;
    }, 600);
  };

  const touchMoveHandler = () => {
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
  };

  const touchEndHandler = () => {
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    clickTimerRef.current = setTimeout(() => {
      clickCount.current = 0;
    }, 300);
    if (clickCount.current === 2) {
      if (!message.isLiked) likeToggle();
      clickCount.current = 0;
    }
  };

  const likeToggle = () => {
    if (likeResult.fetching || unlikeResult.fetching) return;

    if (message.isLiked) return unlikeMutation({ messageId: message.id });

    likeMutation({ messageId: message.id, reaction: "❤️" });
  };

  const replyTitleHandler = () => {
    const viewerUsername = viewer.data?.viewer.username;
    const replyTo = message.message.sentBy.username;
    const replyToFullName = message.message.sentBy.fullName;
    const replyToVisibleName = replyToFullName ? replyToFullName : replyTo;

    if (!isGroup) {
      switch (true) {
        case isViewer && sentBy === replyTo:
          return "You replied to yourself";
        case !isViewer && sentBy === replyTo:
          return "Replied to themselves";
        case isViewer && sentBy !== replyTo:
          return "You replied";
        case !isViewer && sentBy !== replyTo:
          return "Replied to you";
        default:
          break;
      }
      return;
    }
    switch (true) {
      case isViewer && sentBy === replyTo:
        return "You replied to yourself";
      case !isViewer && sentBy === replyTo:
        return `${sentByVisibleName} replied to themselves`;
      case isViewer && sentBy !== replyTo:
        return `You replied to ${replyToVisibleName}`;
      case !isViewer && sentBy !== replyTo && replyTo === viewerUsername:
        return `${sentByVisibleName} replied to you`;
      case !isViewer && sentBy !== replyTo && replyTo !== viewerUsername:
        return `${sentByVisibleName} replied to ${replyToVisibleName}`;
      default:
        break;
    }
  };

  const activityTextHandler = () => {
    const recipientVisibleName = message.user?.fullName
      ? message.user.fullName
      : message.user?.username;
    switch (true) {
      case message.text === "left-chat":
        return (
          <>
            <Bold>{sentByVisibleName}</Bold>
            {"left the chat"}
          </>
        );
      case message.text === "add-chat":
        return (
          <>
            <Bold>{sentByVisibleName}</Bold>
            {"added"}
            <Bold>{recipientVisibleName}</Bold>
          </>
        );
      case message.text === "remove-chat":
        return (
          <>
            <Bold>{sentByVisibleName}</Bold>
            {"removed"}
            <Bold>{recipientVisibleName}</Bold>
          </>
        );

      default:
        return (
          <>
            <Bold>{sentByVisibleName}</Bold>
            {`named the group ${message.text}`}
          </>
        );
    }
  };

  return (
    <Container
      onMouseEnter={() => setOpenMessageMenuId(message.id)}
      onMouseLeave={() => setOpenMessageMenuId("")}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (openSubMenuId === message.id && subMenuButtonRef.current)
          return subMenuButtonRef.current.click();
        setOpenSubMenuId("");
      }}
      onTouchStart={touchStartHandler}
      onTouchMove={touchMoveHandler}
      onTouchEnd={touchEndHandler}
      isViewer={isViewer}
    >
      {message.type === "activity" ? (
        <ActivityContainer>{activityTextHandler()}</ActivityContainer>
      ) : (
        <>
          {!isViewer && (
            <ProfilePhotoContainer>
              {!isViewer &&
                previousMessage &&
                (previousMessage.sentBy.id !== message.sentBy.id ||
                  minutesElapsed(message.createdAt, previousMessage.createdAt) >
                    1) && (
                  <ProfilePhoto
                    height={"24px"}
                    photoVersion={message.sentBy.photoVersion}
                    id={message.sentBy.id}
                    username={message.sentBy.username}
                    isWithoutModal={true}
                  />
                )}
              {!previousMessage && !isViewer && (
                <ProfilePhoto
                  height={"24px"}
                  photoVersion={message.sentBy.photoVersion}
                  id={message.sentBy.id}
                  username={message.sentBy.username}
                  isWithoutModal={true}
                />
              )}
            </ProfilePhotoContainer>
          )}

          <div>
            {nextMessage &&
              isGroup &&
              !message.message &&
              !isViewer &&
              (nextMessage.sentBy.id !== message.sentBy.id ||
                minutesElapsed(nextMessage.createdAt, message.createdAt) >
                  1) && (
                <UsernameContainer>
                  {message.sentBy.fullName
                    ? message.sentBy.fullName
                    : message.sentBy.username}
                </UsernameContainer>
              )}
            {message.message && (
              <>
                <ReplyContainer isViewer={isViewer}>
                  <ReplyText>{replyTitleHandler()}</ReplyText>
                  <SpacerContainer>
                    {!isViewer && <ReplySpacer></ReplySpacer>}
                    <ContentContainer isViewer={!isViewer} isReply={true}>
                      {message.message.photo && (
                        <Image
                          height={200 / message.message.photo.aspectRatio}
                          src={cld.image(message.message.photo.id).toURL()}
                        />
                      )}
                      {message.message.text && (
                        <TextContainer>{message.message.text}</TextContainer>
                      )}
                      {message.message.post && (
                        <PostMessage
                          post={message.message.post}
                          isReply={true}
                        />
                      )}
                    </ContentContainer>

                    {isViewer && <ReplySpacer></ReplySpacer>}
                  </SpacerContainer>
                </ReplyContainer>
              </>
            )}
            <OuterContainer isViewer={isViewer}>
              <MarginContainer isLiked={message.likesCount !== 0}>
                {isViewer &&
                  (openMessageMenuId === message.id ||
                    openSubMenuId === message.id) && (
                    <Options
                      message={message}
                      isMenuHidden={isMenuHidden}
                      setIsMenuHidden={setIsMenuHidden}
                      subMenuButtonRef={subMenuButtonRef}
                      likeToggle={likeToggle}
                    />
                  )}

                {message.sticker ? (
                  <StickerContainer>
                    <HeartSvg height="44" width="44" fill="#ed4956" />
                  </StickerContainer>
                ) : (
                  <ContentContainer isViewer={isViewer}>
                    {message.photo && (
                      <Image
                        height={234 / message.photo.aspectRatio}
                        src={cld.image(message.photo.id).toURL()}
                      />
                    )}
                    {!message.post && message.text && (
                      <TextContainer>{message.text}</TextContainer>
                    )}
                    {message.post && <PostMessage post={message.post} />}
                  </ContentContainer>
                )}
                {!isViewer &&
                  (openMessageMenuId === message.id ||
                    openSubMenuId === message.id) && (
                    <Options
                      isFlipped={true}
                      message={message}
                      isMenuHidden={isMenuHidden}
                      setIsMenuHidden={setIsMenuHidden}
                      subMenuButtonRef={subMenuButtonRef}
                      likeToggle={likeToggle}
                    />
                  )}
              </MarginContainer>
              {message.likesCount !== 0 && (
                <LikeContainer isViewer={isViewer}>
                  <LikeModalButton
                    onClick={() =>
                      setModalAttrs({
                        type: "message-likes",
                        variables: { id: message.id },
                      })
                    }
                  >
                    {message.topReactions.length === 1 &&
                    message.likesCount <= 2 ? (
                      <>
                        <HeartContainer>
                          {message.topReactions[0]}
                        </HeartContainer>
                        {message.reactionsPage.reactions.map((reaction) => {
                          return (
                            <ProfilePhoto
                              key={reaction.user.id}
                              height={"14px"}
                              photoVersion={reaction.user.photoVersion}
                              id={reaction.user.id}
                              username={reaction.user.username}
                              isWithoutLink={true}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <HeartContainer>
                          {message.topReactions[0]}
                        </HeartContainer>
                        {message.topReactions.length > 1 && (
                          <HeartContainer>
                            {message.topReactions[1]}
                          </HeartContainer>
                        )}
                        <span>{message.likesCount}</span>
                      </>
                    )}
                  </LikeModalButton>
                </LikeContainer>
              )}
            </OuterContainer>
          </div>
        </>
      )}
    </Container>
  );
});
