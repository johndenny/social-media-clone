import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { ProfilePhoto } from "../../ProfilePhoto";
import { BackDrop, Container, Header, ModalButton } from "../styled";

interface Props {
  username: string;
  id: string;
  photoVersion: number;
}

export const Follow: React.FC<Props> = ({ username, id, photoVersion }) => {
  const { unfollowButtonRef, setModalAttrs } =
    useGlobalContext() as globalContextType;

  const unfollow = () => {
    unfollowButtonRef?.current?.click();
  };

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <ProfilePhoto
            height="90px"
            username={username}
            id={id}
            photoVersion={photoVersion}
          />
          <p>{`Unfollow @${username}?`}</p>
        </Header>
        <ModalButton onClick={unfollow} color="--error">
          Unfollow
        </ModalButton>
        <ModalButton
          onClick={() => setModalAttrs(null)}
          weight="400"
          color="--primary-text"
        >
          Cancel
        </ModalButton>
      </Container>
    </BackDrop>
  );
};
