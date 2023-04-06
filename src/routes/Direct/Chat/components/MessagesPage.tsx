import React, { useEffect } from "react";
import { useQuery } from "urql";
import { MessageProps } from "..";
import { globalContextType } from "../../../../context/GlobalContext";
import { UniqueChatMessages } from "../../../../graphQL/queries";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { commentDate, messageDate } from "../../../../utils/DateFormat";
import { Message } from "./Message";
import { SecondaryMessage } from "./SecondaryMessage";
import { ScrollActionType } from "../../../../hooks/useInfinitePagination";
import { Spinner } from "../../../../components/Spinner";
import { SeenByContainer } from "../styled";
import { UserNamesI } from "../../../../types";

interface Props {
  variables: { chatId: string; limit: number; skip: number; date: string };
  visableDates: string[] | null | undefined;
  scrollDispatch: React.Dispatch<ScrollActionType>;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  seenByHandler: (readBy: UserNamesI[]) => string;
}

export const MessagesPage = React.memo(function MessageResult({
  variables,
  visableDates,
  scrollDispatch,
  scrollRef,
  seenByHandler,
}: Props) {
  const { viewer } = useGlobalContext() as globalContextType;
  const [resultMessages] = useQuery({
    query: UniqueChatMessages,
    variables,
  });
  const { data, fetching } = resultMessages;

  useEffect(() => {
    if (!data || fetching || !scrollRef.current) return;

    scrollDispatch({ type: "fetching", payload: { isFetching: false } });

    if (data.chatPagedMessages.isNextPage === false) {
      scrollDispatch({ type: "last-page" });
    }
  }, [data]);

  if (fetching || !data)
    return (
      <div style={{ padding: "72px" }}>
        <Spinner size="large" />
      </div>
    );

  return (
    <>
      {data.chatPagedMessages.messages.map(
        (message: MessageProps, index: number, messages: MessageProps[]) => {
          const seenByMessage = seenByHandler(message.readBy);
          const readAt = commentDate(message.readAt);
          return (
            <React.Fragment key={message.id}>
              {index === 0 &&
                message.sentBy.id === viewer.data?.viewer.id &&
                message.type !== "activity" &&
                message.readBy.length !== 0 &&
                variables.skip === 0 && (
                  <SeenByContainer>
                    {`${seenByMessage} ${readAt}`}
                  </SeenByContainer>
                )}

              <Message
                message={message}
                nextMessage={messages[index + 1]}
                previousMessage={messages[index - 1]}
                isViewer={message.sentBy.id === viewer.data.viewer.id}
              />
              {visableDates?.findIndex((date) => date === message.createdAt) !==
                -1 && (
                <SecondaryMessage text={messageDate(message.createdAt)} />
              )}
            </React.Fragment>
          );
        }
      )}
    </>
  );
});
