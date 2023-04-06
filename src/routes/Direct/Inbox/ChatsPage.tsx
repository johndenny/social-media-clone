import React, { useEffect } from "react";
import { useQuery } from "urql";
import { ChatType } from ".";
import { Spinner } from "../../../components/Spinner";
import { ViewerChats } from "../../../graphQL/queries";
import {
  PageVariablesI,
  ScrollActionType,
} from "../../../hooks/useInfinitePagination";
import { ChatItem } from "./ChatItem";

interface ChatsPageVariables extends PageVariablesI {
  date: string;
}

interface Props {
  variables: ChatsPageVariables;
  scrollDispatch: React.Dispatch<ScrollActionType>;
}

export const ChatsPage: React.FC<Props> = ({ variables, scrollDispatch }) => {
  const [resultChats] = useQuery({ query: ViewerChats, variables });
  const { data, fetching } = resultChats;

  useEffect(() => {
    if (!data) return;
    scrollDispatch({ type: "fetching", payload: { isFetching: false } });

    if (data?.viewerChatsPaged.isNextPage === false)
      scrollDispatch({ type: "last-page" });
  }, [data]);

  if (fetching)
    return (
      <div style={{ padding: "32px" }}>
        <Spinner size="large" />
      </div>
    );

  return (
    <div>
      {data?.viewerChatsPaged.chats.map((chat: ChatType) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
};
