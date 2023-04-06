import React, { useRef } from "react";
import { Margin } from "./styled";
import { ProfilePhotoButton } from "../../../../../components/ProfilePhotoButton";
import { Button } from "../../../../../styled";
import { Container, TextHeader } from "./styled";
import { ModalType } from "../../../../../components/Modal";
import useImageUpload from "../../../../../hooks/useImageUpload";
import { HiddenFileInput } from "../../../../../components/HiddenFileInput";
import { ProfilePhoto } from "../../../../../components/ProfilePhoto";
import { UserProfileI } from "../../../../../types";

interface Props {
  user: UserProfileI;
  setModalAttrs?: React.Dispatch<React.SetStateAction<ModalType | null>>;
}

export const Header: React.FC<Props> = ({ user, setModalAttrs }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fileChangeHandler } = useImageUpload();

  const inputHandler = () => {
    user.photoVersion && setModalAttrs
      ? setModalAttrs({ type: "profile-photo" })
      : inputRef?.current?.click();
  };

  return (
    <Container>
      <Margin>
        {setModalAttrs ? (
          <ProfilePhotoButton user={user} height="38px" />
        ) : (
          <ProfilePhoto height={"38px"} {...user} isWithoutLink={true} />
        )}
      </Margin>
      <div style={{ justifyContent: "center" }}>
        <TextHeader>{user.username}</TextHeader>
        {setModalAttrs && (
          <>
            <Button onClick={inputHandler}>Change profile photo</Button>
            <HiddenFileInput
              name="profile-photo"
              inputRef={inputRef}
              fileChangeHandler={fileChangeHandler}
            />
          </>
        )}
      </div>
    </Container>
  );
};
