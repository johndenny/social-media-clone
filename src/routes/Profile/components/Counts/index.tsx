import React from "react";
import { Link } from "react-router-dom";
import { PreloadLink } from "../../../../components/PreloadLink";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { BoldText, CountContainer, List, UnorderedList } from "./styled";

interface Props {
  isViewingOwnProfile: boolean;
  username: string;
  isPrivate: boolean;
  counts: {
    followedBy: number;
    follows: number;
    media: number;
  };
}

export const Counts = React.memo(function Counts({
  counts,
  username,
  isPrivate,
  isViewingOwnProfile,
}: Props) {
  const { resultFollowing, resultFollowers } =
    useGlobalContext() as globalContextType;
  return (
    <UnorderedList>
      <List>
        <CountContainer>
          <BoldText>{counts?.media}</BoldText>
          {" posts"}
        </CountContainer>
      </List>
      <List>
        {(!isViewingOwnProfile && counts?.followedBy) === 0 || isPrivate ? (
          <CountContainer>
            <BoldText>{counts?.followedBy}</BoldText>
            {" followers"}
          </CountContainer>
        ) : (
          <PreloadLink
            to={`/${username}/followers`}
            query={PreloadQuery.followers}
            queryResult={resultFollowers}
            variables={{ username, limit: 16, skip: 0 }}
          >
            <CountContainer>
              <BoldText>{counts?.followedBy}</BoldText>
              {" followers"}
            </CountContainer>
          </PreloadLink>
        )}
      </List>
      <List>
        {(!isViewingOwnProfile && counts?.follows === 0) || isPrivate ? (
          <CountContainer>
            <BoldText>{counts?.follows}</BoldText>
            {" following"}
          </CountContainer>
        ) : (
          <PreloadLink
            to={`/${username}/following`}
            query={PreloadQuery.following}
            queryResult={resultFollowing}
            variables={{ username, limit: 16, skip: 0 }}
          >
            <CountContainer>
              <BoldText>{counts?.follows}</BoldText>
              {" following"}
            </CountContainer>
          </PreloadLink>
        )}
      </List>
    </UnorderedList>
  );
});
