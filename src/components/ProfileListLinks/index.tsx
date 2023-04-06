import React from "react";
import { UserListI } from "../../types";
import { ProfileListItem } from "../ProfileListItem";

interface Props {
  profiles: UserListI[];
  isHomepage?: boolean;
  isFullWidthLink?: boolean;
  isViewersFollowers?: boolean;
}

export const ProfileListLinks: React.FC<Props> = ({
  profiles,
  isHomepage,
  isViewersFollowers,
}) => {
  return (
    <ul>
      {profiles?.map((profile) => {
        return (
          <ProfileListItem
            key={profile.id}
            user={profile}
            photoHeight={isHomepage ? "32px" : "44px"}
            isHomepage={isHomepage}
            isViewersFollowers={isViewersFollowers}
          />
        );
      })}
    </ul>
  );
};
