import React, { useRef } from "react";
import { Img } from "../ProfilePhoto/styled/Img";
import defaultProfilePhoto from "../../assets/images/default_profile_photo.jpg";
import { Container, SpinnerContainer, UploadButton } from "./styled";
import useImageUpload from "../../hooks/useImageUpload";
import { cld } from "../../utils/cloudinaryConfig";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType } from "../../context/GlobalContext";
import { HiddenFileInput } from "../HiddenFileInput";
import { Spinner } from "../Spinner";
import { UserNamesI } from "../../types";

interface Props {
  /**
   * applies to height and width
   */
  user: UserNamesI;
  margin?: string;
  height: string;
}

/**
 * profile picture button
 *
 * @param height applies to height and width.
 */
export const ProfilePhotoButton: React.FC<Props> = ({
  height,
  margin,
  user,
}) => {
  const { setModalAttrs, removeProfilePhotoResult, uploadProfilePhotoResult } =
    useGlobalContext() as globalContextType;
  const { fileChangeHandler } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const inputHandler = () => {
    user.photoVersion
      ? setModalAttrs({ type: "profile-photo" })
      : inputRef?.current?.click();
  };

  return (
    <Container height={height} margin={margin}>
      {(removeProfilePhotoResult.fetching ||
        uploadProfilePhotoResult.fetching) && (
        <SpinnerContainer>
          <Spinner size="large" />
        </SpinnerContainer>
      )}
      <UploadButton
        fetching={
          removeProfilePhotoResult.fetching || uploadProfilePhotoResult.fetching
        }
        onClick={inputHandler}
      >
        <Img
          alt={`${user?.username}'s Profile Photo`}
          src={
            user?.photoVersion
              ? cld
                  .image(`profile_pictures/${user.id}`)
                  .setVersion(user.photoVersion)
                  .toURL()
              : null || defaultProfilePhoto
          }
        />
      </UploadButton>
      <HiddenFileInput
        name="profile-photo"
        inputRef={inputRef}
        fileChangeHandler={fileChangeHandler}
      />
    </Container>
  );
};
