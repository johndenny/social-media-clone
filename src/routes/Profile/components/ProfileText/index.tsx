import React from "react";
import { FullName, TextContainer } from "./styled";

interface Props {
  fullName: string;
  bio: string;
  url: string;
}

export const ProfileText = React.memo(function ProfileText({
  url,
  bio,
  fullName,
}: Props) {
  return (
    <TextContainer>
      <FullName>{fullName}</FullName>
      <p>{bio}</p>
      <a
        href={`https://${url}`}
        rel="me nofollow noopener noreferrer"
        target="blank"
      >
        {url}
      </a>
    </TextContainer>
  );
});
