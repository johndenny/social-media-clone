import React from "react";
import { Container, FollowersIcon, TextHeader } from "./styled";

interface Props {}

export const FollowersPlaceholder: React.FC<Props> = () => {
  return (
    <Container>
      <FollowersIcon></FollowersIcon>
      <TextHeader>Followers</TextHeader>
      <p>You'll see all the people who follow you here.</p>
    </Container>
  );
};
