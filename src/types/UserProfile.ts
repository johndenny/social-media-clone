import { MutualFollowersI } from "./MutualFollowers";

export interface UserProfileI {
  id: string;
  photoVersion: number;
  username: string;
  fullName: string;
  bio: string;
  url: string;
  counts: {
    followedBy: number;
    follows: number;
    media: number;
  };
  mutualFollowers: MutualFollowersI;
  isFollowing: boolean;
  isRequested: boolean;
  isPrivate: boolean;
}
