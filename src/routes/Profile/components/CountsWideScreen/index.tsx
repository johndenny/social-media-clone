import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BoldText } from "../Counts/styled";
import { UnorderedList } from "./styles";

interface Props {
  username: string;
  isPrivate: boolean;
  counts: {
    followedBy: number;
    follows: number;
    media: number;
  };
}

export const CountsWideScreen: React.FC<Props> = ({
  counts,
  username,
  isPrivate,
}) => {
  const location = useLocation();

  return (
    <UnorderedList>
      <li>
        <BoldText>{counts?.media}</BoldText>
        {" posts"}
      </li>
      <li>
        {counts.followedBy === 0 || isPrivate ? (
          <span>
            {" "}
            <BoldText>{counts?.followedBy}</BoldText>
            {" followers"}
          </span>
        ) : (
          <Link
            to={`/${username}/followers`}
            state={{ background: location.pathname }}
          >
            <BoldText>{counts?.followedBy}</BoldText>
            {" followers"}
          </Link>
        )}
      </li>
      <li>
        {counts.follows === 0 || isPrivate ? (
          <span>
            {" "}
            <BoldText>{counts?.follows}</BoldText>
            {" following"}
          </span>
        ) : (
          <Link
            to={`/${username}/following/`}
            state={{ background: location.pathname }}
          >
            <BoldText>{counts?.follows}</BoldText>
            {" following"}
          </Link>
        )}
      </li>
    </UnorderedList>
  );
};
