import React, { HTMLAttributes } from "react";
import { ProfilePhoto } from "../../../../../components/ProfilePhoto";
import { UserNamesI } from "../../../../../types";
import { Container, RightContainer, TextContainer } from "./styled";
import { ReactComponent as ChevronRightSvg } from "../../../../../assets/svgs/chevronRight.svg";
import { DoubleProfilePhoto } from "../../../../../components/DoubleProfilePhoto";
import { UnreadIcon } from "../../../../Direct/Inbox/ChatItem/styled";

interface Props extends HTMLAttributes<HTMLDivElement> {
  users: UserNamesI[];
  count: number;
}

export const FollowRequestButton: React.FC<Props> = ({
  users,
  count,
  ...attributes
}) => {
  const usernames = users.map((user) => user.fullName || user.username);
  const textHandler = () => {
    if (count === 1) return usernames[0];
    if (count === 2) return `${usernames[0]} and ${usernames[1]}`;
    return `${usernames[0]}, ${usernames[1]} and ${count - 2} more`;
  };

  return (
    <Container {...attributes} role="button">
      {users?.length === 2 ? (
        <DoubleProfilePhoto height={"40px"} profiles={users} />
      ) : (
        <ProfilePhoto height={"44px"} {...users[0]} isWithoutLink={true} />
      )}
      <TextContainer>
        <span style={{ fontWeight: "600" }}>Follow requests</span>
        <span style={{ color: "rgb(var(--secondary-text))" }}>
          {textHandler()}
        </span>
      </TextContainer>
      <RightContainer>
        <UnreadIcon></UnreadIcon>
        <ChevronRightSvg stroke="#8e8e8e"></ChevronRightSvg>
      </RightContainer>
    </Container>
  );
};
