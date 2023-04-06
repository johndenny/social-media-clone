import React, { useRef } from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import useImageUpload from "../../../hooks/useImageUpload";
import { HiddenFileInput } from "../../HiddenFileInput";
import {
  BackDrop,
  Container,
  Header,
  HeaderText,
  ModalButton,
} from "../styled";

export const EditProfilePhoto: React.FC = () => {
  const { removeProfilePhotoHandler, setModalAttrs } =
    useGlobalContext() as globalContextType;
  const inputRef = useRef<HTMLInputElement>(null);
  const { fileChangeHandler } = useImageUpload();

  const inputHandler = () => inputRef?.current?.click();

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>{"Change Profile Photo"}</HeaderText>
        </Header>
        <ModalButton onClick={inputHandler} color="--primary-button">
          Upload Photo
        </ModalButton>
        <ModalButton onClick={removeProfilePhotoHandler} color="--error">
          Remove Current Photo
        </ModalButton>
        <HiddenFileInput
          name="profile-photo"
          inputRef={inputRef}
          fileChangeHandler={fileChangeHandler}
        />
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
