import React from "react";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useProfileModal } from "../../hooks/useProfileModal";
import { PreloadLink } from "../PreloadLink";
import { Span } from "./styled";

interface Props {
  username: string;
  isWithoutModal?: boolean;
  isWithoutLink?: boolean;
  isInline?: boolean;
}

export const UsernameLink: React.FC<Props> = ({
  username,
  isWithoutModal,
  isWithoutLink,
  isInline,
}) => {
  const { user } = useGlobalContext() as globalContextType;
  const [mouseEnterHandler, mouseLeaveHandler] = useProfileModal({ username });

  if (isWithoutLink)
    return <Span style={{ fontWeight: "600" }}>{username}</Span>;

  return (
    <PreloadLink
      to={`/${username}/`}
      query={PreloadQuery.user}
      queryResult={user}
      variables={{ username, limit: 12, skip: 0 }}
      style={isInline ? {} : { display: "flex", maxWidth: "100%" }}
    >
      <Span
        onMouseEnter={isWithoutModal ? undefined : mouseEnterHandler}
        onMouseLeave={isWithoutModal ? undefined : mouseLeaveHandler}
      >
        {username}
      </Span>
    </PreloadLink>
  );
};
