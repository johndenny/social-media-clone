import React from "react";
import { Img } from "./styled/Img";
import { Span } from "./styled/Span";
import defaultProfilePicture from "../../assets/images/default_profile_photo.jpg";
import { cld } from "../../utils/cloudinaryConfig";
import { PreloadLink } from "../PreloadLink";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useProfileModal } from "../../hooks/useProfileModal";

interface Props {
  /**
   * applies to height and width
   */
  height: string;
  photoVersion: number;
  id: string;
  username: string;
  isWithoutLink?: boolean;
  isWithoutModal?: boolean;
}

/**
 * profile picture
 *
 * @param height applies to height and width.
 */
export const ProfilePhoto = React.memo(function ProfilePhoto({
  height,
  photoVersion,
  id,
  username,
  isWithoutLink,
  isWithoutModal,
}: Props) {
  const { user } = useGlobalContext() as globalContextType;
  const profilePhoto = photoVersion
    ? cld.image(`profile_pictures/${id}`).setVersion(photoVersion)
    : null;

  const [mouseEnterHandler, mouseLeaveHandler] = useProfileModal({ username });

  if (isWithoutLink)
    return (
      <Span height={height}>
        <Img
          draggable={false}
          alt={`${username}'s Profile Photo`}
          src={profilePhoto?.toURL() || defaultProfilePicture}
        />
      </Span>
    );
  return (
    <PreloadLink
      to={`/${username}/`}
      query={PreloadQuery.user}
      queryResult={user}
      variables={{ username, limit: 12, skip: 0 }}
    >
      <Span
        height={height}
        onMouseEnter={isWithoutModal ? undefined : mouseEnterHandler}
        onMouseLeave={isWithoutModal ? undefined : mouseLeaveHandler}
      >
        <Img
          draggable={false}
          alt={`${username}'s Profile Photo`}
          src={profilePhoto?.toURL() || defaultProfilePicture}
        />
      </Span>
    </PreloadLink>
  );
});
