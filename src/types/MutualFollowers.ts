export interface MutualFollowersI {
  id: string;
  count: number;
  users: { username: string }[];
}
