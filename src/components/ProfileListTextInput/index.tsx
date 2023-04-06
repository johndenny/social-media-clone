import React from "react";
import { Button } from "../../styled";
import { UserListI } from "../../types";
import { ProfileListItem } from "../ProfileListItem";
import { UnorderedList } from "./styled";

interface Props {
  profiles: UserListI[];
  getUsername: (text: string) => void;
  position: "top" | "bottom";
}

export const ProfileListTextInput: React.FC<Props> = ({
  profiles,
  getUsername,
  position,
}) => {
  return (
    <UnorderedList position={position}>
      {profiles.map((profile) => {
        return (
          <Button
            id="searchItem"
            key={profile.id}
            onClick={() => getUsername(profile.username)}
            style={{ color: "rgb(var(--primary-text))" }}
          >
            <ProfileListItem
              user={profile}
              photoHeight="30px"
              border={position}
            />
          </Button>
        );
      })}
    </UnorderedList>
  );
};
