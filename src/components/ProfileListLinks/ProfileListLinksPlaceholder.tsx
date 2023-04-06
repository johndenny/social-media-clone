import React from "react";
import { ProfileListItemPlaceholder } from "../ProfileListItem/ProfileListItemPlaceholder";

interface Props {
  listLength: number;
  photoHeight?: number;
}

export const ProfileListLinksPlaceholder: React.FC<Props> = ({
  listLength,
  photoHeight,
}) => {
  const profiles = new Array(listLength).fill("p");
  return (
    <div>
      {profiles.map((profile, index) => (
        <ProfileListItemPlaceholder key={index} photoHeight={photoHeight} />
      ))}
    </div>
  );
};
