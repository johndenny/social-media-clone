import React from "react";
import { Container, FollowersIcon, TextHeader } from "../Followers/styled";

interface Props {}

export const FollowingPlaceholder: React.FC<Props> = () => {
  return (
    <Container>
      <FollowersIcon></FollowersIcon>
      <TextHeader>People you follow</TextHeader>
      <p>Once you follow people, you'll see them here.</p>
    </Container>
  );
};
