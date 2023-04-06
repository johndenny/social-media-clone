import React from "react";
import { useMutation } from "urql";
import { PaddedButton } from "../../../../components/PaddedButton";
import { ProfilePhoto } from "../../../../components/ProfilePhoto";
import { UsernameLink } from "../../../../components/UsernameLink";
import { globalContextType } from "../../../../context/GlobalContext";
import {
  ConfirmFollowRequest,
  RemoveFollowRequest,
} from "../../../../graphQL/mutations";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { UserNamesI } from "../../../../types";
import {
  Container,
  RightContainer,
  TextContainer,
} from "./FollowRequestButton/styled";

interface Props {
  user: UserNamesI;
}

export const FollowRequestItem: React.FC<Props> = ({ user }) => {
  const { viewer, setFooterMessage } = useGlobalContext() as globalContextType;
  const viewerId = viewer.data?.viewer.id;

  const [removeRequestResult, removeFollowRequest] =
    useMutation(RemoveFollowRequest);
  const [confirmRequestResult, confirmRequest] =
    useMutation(ConfirmFollowRequest);

  const removeRequestHandler = () => {
    removeFollowRequest({ receiveId: viewerId, requestId: user.id }).then(
      (result) => {
        if (result.error) setFooterMessage("Server Error");
      }
    );
  };

  const confirmRequestHandler = () => {
    confirmRequest({ requestId: user.id }).then((result) => {
      if (result.error) setFooterMessage("Server Error");
    });
  };

  return (
    <Container style={{ padding: "8px 16px" }}>
      <ProfilePhoto height={"44px"} isWithoutModal={true} {...user} />
      <TextContainer>
        <UsernameLink username={user.username} isWithoutModal={true} />
        <span style={{ color: "rgb(var(--secondary-text))" }}>
          {user.fullName}
        </span>
      </TextContainer>
      <RightContainer>
        <PaddedButton onClick={confirmRequestHandler}>Confrim</PaddedButton>
        <PaddedButton
          onClick={removeRequestHandler}
          fillType="secondary"
          fetching={removeRequestResult.fetching}
        >
          Delete
        </PaddedButton>
      </RightContainer>
    </Container>
  );
};
