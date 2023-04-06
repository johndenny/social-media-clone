import { MutualFollowersI } from "./MutualFollowers";
import { UserNamesI } from "./UserNames";

export interface UserListI extends UserNamesI {
  isFollowing: boolean;
  isRequested: boolean;
  isPrivate: boolean;
  mutualFollowers: MutualFollowersI;
}
