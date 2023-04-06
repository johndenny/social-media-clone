import React from "react";
import { useMutation } from "urql";
import { globalContextType } from "../../../../context/GlobalContext";
import { UnlikeMessage } from "../../../../graphQL/mutations";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { messageLikeType } from "../../../../routes/Direct/Chat";
import { SecondaryText } from "../../../ProfileListItem/styled";
import { ProfilePhoto } from "../../../ProfilePhoto";
import { Container, TextContainer } from "./styled";

interface Props {
  like: messageLikeType;
}

export const MessageLikeItem: React.FC<Props> = ({ like }) => {
  const { viewer, setModalAttrs } = useGlobalContext() as globalContextType;
  const [resultUnlike, unlikeMutation] = useMutation(UnlikeMessage);
  const { user, message } = like;
  const isViewer = viewer.data?.viewer.id === user.id;

  const unlikeHandler = () => {
    if (!isViewer) return;
    unlikeMutation({ messageId: message.id }).then((result) => {
      setModalAttrs(null);
    });
  };

  return (
    <Container onClick={unlikeHandler} isViewer={isViewer}>
      <ProfilePhoto
        height={"40px"}
        photoVersion={user.photoVersion}
        id={user.id}
        username={user.username}
      />
      <TextContainer>
        <span>{user.fullName ? user.fullName : user.username}</span>
        {isViewer && <SecondaryText>Tap to remove</SecondaryText>}
      </TextContainer>
      <div>{like.reaction}</div>
    </Container>
  );
};
