import React, { useContext } from "react";
import { useCreateContext } from "../../..";
import { ProfileListItem } from "../../../../../components/ProfileListItem";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../context/CreatePostContext";
import { UserListI } from "../../../../../types";
import { ProfileButton } from "./styled";

interface Props {
  profiles: UserListI[];
}

export const TagProfileList: React.FC<Props> = ({ profiles }) => {
  const mobileCreateContext = useCreateContext();
  const wideCreateContext = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const mobileTagHandler = (profile: UserListI) => {
    const { id, username } = profile;
    const { tagDispatch, setTagLocation, tagLocation } = mobileCreateContext;
    const { x, y } = tagLocation;
    tagDispatch({
      type: "add",
      payload: { userId: id, username, x, y },
    });
    setTagLocation(null);
  };

  const wideTagHandler = (profile: UserListI) => {
    const { id, username } = profile;
    const {
      photosToUploadDispatch,
      selectedIndex,
      tagSearchLocation,
      setTagSearchLocation,
    } = wideCreateContext;
    if (!tagSearchLocation) return;
    const { xPercent, yPercent } = tagSearchLocation;
    const tag = { userId: id, username, x: xPercent, y: yPercent };
    photosToUploadDispatch({
      type: "add-tag",
      payload: { selectedIndex, tag },
    });
    setTagSearchLocation(null);
  };

  const tagHandler = (profile: UserListI) => {
    if (mobileCreateContext) return mobileTagHandler(profile);
    if (wideCreateContext) return wideTagHandler(profile);
  };

  return (
    <ul style={{ overflow: "auto" }}>
      {profiles.map((profile) => {
        return (
          <ProfileButton key={profile.id} onClick={() => tagHandler(profile)}>
            <ProfileListItem
              user={profile}
              photoHeight="44px"
              isWithoutLink={true}
            />
          </ProfileButton>
        );
      })}
    </ul>
  );
};
