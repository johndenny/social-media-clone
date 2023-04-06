import React, { useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useMutation } from "urql";
import { HeaderMobile } from "../../components/HeaderMobile";
import { globalContextType } from "../../context/GlobalContext";
import { LikeMessage } from "../../graphQL/mutations";
import useGlobalContext from "../../hooks/useGlobalContext";
import { MessageProps } from "./Chat";
import { Placeholder } from "./Placeholder";
import { SideBar } from "./SideBar";
import { Header } from "./SideBar/styled";
import { ChatContainer } from "./styled";
import { Container } from "./styled/Container";
import { InnerContainer } from "./styled/InnerContainer";

type DirectContextType = {
  messageToReply: MessageProps;
  setMessageToReply: React.Dispatch<React.SetStateAction<MessageProps | null>>;
  isReplyClosing: boolean;
  setIsReplyClosing: React.Dispatch<React.SetStateAction<boolean>>;
  openSubMenuId: string;
  setOpenSubMenuId: React.Dispatch<React.SetStateAction<string>>;
  reactionHandler: (messageId: string, reaction: string) => void;
  setIsRequests: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Props {}

export const Direct: React.FC<Props> = () => {
  const params = useParams();
  const { isMobile, headerAttrs, setFooterMessage } =
    useGlobalContext() as globalContextType;
  const [resultReaction, messageReaction] = useMutation(LikeMessage);

  const [messageToReply, setMessageToReply] = useState<MessageProps | null>(
    null
  );
  const [isReplyClosing, setIsReplyClosing] = useState(false);
  const [openSubMenuId, setOpenSubMenuId] = useState("");
  const [isRequests, setIsRequests] = useState(false);

  const reactionHandler = (messageId: string, reaction: string) => {
    messageReaction({ messageId, reaction }).then((result) => {
      if (result.error) setFooterMessage("Error reacting to message.");
    });
  };

  if (isMobile === null) return <></>;

  return (
    <InnerContainer isMobile={isMobile}>
      {!isMobile && (
        <SideBar isRequests={isRequests} setIsRequests={setIsRequests} />
      )}

      <ChatContainer>
        {!isMobile && !params.chatId ? (
          <Placeholder />
        ) : (
          <>
            {!isMobile && (
              <Header>
                <HeaderMobile {...headerAttrs} />
              </Header>
            )}

            <Outlet
              context={{
                setIsRequests,
                setOpenSubMenuId,
                openSubMenuId,
                messageToReply,
                setMessageToReply,
                isReplyClosing,
                setIsReplyClosing,
                reactionHandler,
              }}
            />
          </>
        )}
      </ChatContainer>
    </InnerContainer>
  );
};

export function useDirectContext() {
  return useOutletContext<DirectContextType>();
}
