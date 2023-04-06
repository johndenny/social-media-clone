import React from "react";
import { MessageProps } from "..";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { UserNamesI } from "../../../../types";
import { commentDate, messageDate } from "../../../../utils/DateFormat";
import { SeenByContainer } from "../styled";
import { Message } from "./Message";
import { SecondaryMessage } from "./SecondaryMessage";

interface Props {
  messages: MessageProps[];
  visableDates: string[] | null | undefined;
  seenByHandler: (readBy: UserNamesI[]) => string;
}

export const FirstMessages: React.FC<Props> = ({
  messages,
  seenByHandler,
  visableDates,
}) => {
  const { viewer } = useGlobalContext() as globalContextType;
  return (
    <>
      {messages?.map(
        (message: MessageProps, index: number, messages: MessageProps[]) => {
          return (
            <React.Fragment key={message.id}>
              {index === 0 &&
                message.sentBy.id === viewer.data?.viewer.id &&
                message.type !== "activity" &&
                message.readBy.length !== 0 && (
                  <SeenByContainer>
                    {`${seenByHandler(message.readBy)} ${commentDate(
                      message.readAt
                    )}`}
                  </SeenByContainer>
                )}

              <Message
                message={message}
                nextMessage={messages[index + 1]}
                previousMessage={messages[index - 1]}
                isViewer={message.sentBy.id === viewer.data?.viewer.id}
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
};
