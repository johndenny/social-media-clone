import React from "react";
import { SecondaryText } from "../../../styled";
import { MutualFollowersI } from "../../../types/MutualFollowers";

interface Props {
  mutualFollowers: MutualFollowersI;
}

export const MutualFollowers: React.FC<Props> = ({ mutualFollowers }) => {
  const { count, users } = mutualFollowers;

  switch (count) {
    case 1:
      return (
        <SecondaryText>{`followed by ${users[0].username}`}</SecondaryText>
      );
    case 2:
      return (
        <SecondaryText>{`followed by ${users[0].username} and ${users[1].username}`}</SecondaryText>
      );
    case 3:
      return (
        <SecondaryText>{`followed by ${users[0].username}, ${users[1].username} and 1 other`}</SecondaryText>
      );

    default:
      return (
        <SecondaryText>{`followed by ${users[0].username}, ${
          users[1].username
        } and ${count - 2} others`}</SecondaryText>
      );
  }
};
