import React, { useEffect, useLayoutEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation, useSubscription } from "urql";
import { DoubleProfilePhoto } from "../../../components/DoubleProfilePhoto";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../components/HeaderMobile";
import { PreloadLink } from "../../../components/PreloadLink";
import { ProfileListLinksPlaceholder } from "../../../components/ProfileListLinks/ProfileListLinksPlaceholder";
import { Spinner } from "../../../components/Spinner";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import { RemoveAllChatRequests } from "../../../graphQL/mutations";
import { NewInboxMessage } from "../../../graphQL/subsriptions/NewInboxMessage";
import useGlobalContext from "../../../hooks/useGlobalContext";
import {
  ScrollActionType,
  useInfinitePagination,
} from "../../../hooks/useInfinitePagination";
import { UserListI } from "../../../types";
import { MessageProps } from "../Chat";
import { Button } from "../Chat/components/RequestFooter/styled";
import { ChatItem } from "./ChatItem";
import { ChatsPage } from "./ChatsPage";
import { Container, RequestContainer } from "./styled";

export type ChatType = {
  id: string;
  name: string;
  members: UserListI[];
  lastestMessage: MessageProps;
  isAdmin: boolean;
};

interface Props {
  isRequests?: boolean;
  setIsRequests?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Inbox: React.FC<Props> = ({ isRequests, setIsRequests }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setHeaderAttrs,
    viewer,
    setIsFooterNavHidden,
    resultViewerChats,
    resultRequestChats,
    queryVarsDispatch,
    setFooterMessage,
    isMobile,
    messagesDate,
  } = useGlobalContext() as globalContextType;
  const [removeAllRequestsResults, removeAllRequestsMutation] = useMutation(
    RemoveAllChatRequests
  );
  const [inboxResult] = useSubscription({ query: NewInboxMessage });

  const { data, fetching } = isRequests
    ? resultRequestChats
    : resultViewerChats;
  const chatsPage = isRequests
    ? data?.requestChatsPaged
    : data?.viewerChatsPaged;
  const unreadChatRequestCount = viewer.data?.viewer.chatRequestsCount;
  const chatsCount = chatsPage?.chats.length;

  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 16,
    type: isMobile ? undefined : "modal",
  });

  useLayoutEffect(() => {
    document.title = "Inbox • Chats";

    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: viewer.data?.viewer.username,
      rightButton: RightHeaderButton.newMessage,
    });
    setIsFooterNavHidden(true);
    return () => {
      setIsFooterNavHidden(false);
    };
  }, []);

  useLayoutEffect(() => {
    isRequests
      ? queryVarsDispatch({
          type: "add",
          payload: {
            query: PreloadQuery.viewerRequestChats,
            variables: { limit: 16, skip: 0, date: messagesDate },
          },
        })
      : queryVarsDispatch({
          type: "add",
          payload: {
            query: PreloadQuery.viewerChats,
            variables: { limit: 16, skip: 0, date: messagesDate },
          },
        });
    return () => {
      if (isRequests && setIsRequests) setIsRequests(false);
    };
  }, [isRequests, location]);

  useEffect(() => {
    if (!data) return;
    if (chatsPage.isNextPage === false) scrollDispatch({ type: "last-page" });
  }, [data]);

  const removeAllRequestsHandler = () => {
    removeAllRequestsMutation().then((result) => {
      if (result.error) setFooterMessage("Server error.");
      if (result.data) navigate("/direct/inbox/");
    });
  };

  return (
    <Container ref={scrollRef}>
      {fetching || !data || chatsCount === 0 ? (
        <ProfileListLinksPlaceholder
          listLength={chatsCount !== undefined && chatsCount === 0 ? 3 : 6}
          photoHeight={56}
        />
      ) : (
        <>
          {!isRequests && (
            <RequestContainer>
              <span>Messages</span>
              <PreloadLink
                to={"/direct/requests/"}
                query={PreloadQuery.viewerRequestChats}
                queryResult={resultRequestChats}
                variables={{ limit: 16, skip: 0, date: messagesDate }}
              >
                {unreadChatRequestCount === 0 ? (
                  <span style={{ color: "rgb(var(--secondary-text))" }}>
                    Requests
                  </span>
                ) : (
                  <span
                    style={{ color: "rgb(var(--primary-button))" }}
                  >{`Requests (${unreadChatRequestCount})`}</span>
                )}
              </PreloadLink>
            </RequestContainer>
          )}

          {scrollState.moreVars.map((vars, index) => (
            <ChatsPage
              key={vars.limit + vars.skip + index}
              variables={{ ...vars, date: messagesDate }}
              scrollDispatch={scrollDispatch}
            />
          ))}
          {isRequests &&
            resultRequestChats.data?.requestChatsPaged.chats.length !== 0 && (
              <Button
                onClick={removeAllRequestsHandler}
                style={{ color: "rgb(var(--error))" }}
              >
                Delete All
              </Button>
            )}
        </>
      )}
    </Container>
  );
};
