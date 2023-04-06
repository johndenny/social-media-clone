import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  EmojiContainer,
  Form,
  ReplyMessage,
  Section,
  SpinnerContainer,
  TextArea,
} from "./styled";
import { useParams } from "react-router-dom";
import { useMutation } from "urql";
import { ProfileListTextInput } from "../../../../../components/ProfileListTextInput";
import { ProfilePhoto } from "../../../../../components/ProfilePhoto";
import { globalContextType } from "../../../../../context/GlobalContext";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { useTextInputSearch } from "../../../../../hooks/useTextInputSearch";
import { TagListTextInput } from "../../../../../components/TagListTextInput";
import { Comment, Reply } from "../../../../../graphQL/mutations";
import { EmojiModal } from "../../../../../components/EmojiModal";
import { Spinner } from "../../../../../components/Spinner";

interface Props {
  scrollRef?: React.RefObject<HTMLUListElement>;
  isWide?: boolean;
  postId?: string;
}

export const CommentInput: React.FC<Props> = ({
  scrollRef,
  isWide,
  postId,
}) => {
  const params = useParams();
  const id = params.postId || postId;
  const {
    setNewReplyCommentId,
    viewer,
    setFooterMessage,
    resultComments,
    replyVars,
    setReplyVars,
    isMobile,
  } = useGlobalContext() as globalContextType;
  const [comment, setComment] = useState("");
  const {
    textAreaRef,
    setIsFocused,
    textChangeHandler,
    insertSearch,
    searchListUser,
    searchListTag,
  } = useTextInputSearch(comment, setComment);
  const [commentResult, commentMutation] = useMutation(Comment);
  const [replyResult, replyMutation] = useMutation(Reply);
  const formRef = useRef<HTMLFormElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState(18);
  const [isNewComment, setIsNewComment] = useState(false);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    textChangeHandler(e);
    setTextAreaHeight(1);
  };

  useLayoutEffect(() => {
    const scrollHeight = textAreaRef.current?.scrollHeight;
    if (scrollHeight !== textAreaHeight && scrollHeight)
      setTextAreaHeight(scrollHeight);
  }, [comment]);

  const commentReplyToggle = (e: SyntheticEvent) => {
    e.preventDefault();
    if (replyVars) {
      return replyHandler();
    }
    commentHandler();
  };

  const commentHandler = () => {
    setIsNewComment(true);
    commentMutation({ postId: id, text: comment }).then((result) => {
      if (result.error) setFooterMessage("Error posting comment.");
      if (result.data) {
        setComment("");
      }
    });
  };

  useEffect(() => {
    if (scrollRef?.current && isNewComment) {
      setIsNewComment(false);
      scrollRef.current.scrollTop = isWide ? 0 : scrollRef.current.scrollHeight;
    }
  }, [resultComments.data]);

  const replyHandler = () => {
    replyMutation({
      postId: id,
      commentId: replyVars?.commentId,
      text: comment,
    }).then((result) => {
      if (result.error) setFooterMessage("Error posting reply.");
      if (result.data) {
        setNewReplyCommentId(replyVars?.commentId);
        setComment("");
        setReplyVars(null);
      }
    });
  };

  useEffect(() => {
    if (replyVars) {
      setComment(`@${replyVars.username} `);
      textAreaRef.current?.focus();
    }
  }, [replyVars]);

  const resetReplyHandler = () => {
    setReplyVars(null);
    setComment("");
  };

  const enterPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.relatedTarget?.id === "searchItem") return;
    setIsFocused(false);
  };

  return (
    <div>
      {replyVars?.username && isWide && (
        <ReplyMessage position={isWide ? "top" : "bottom"}>
          <span>{`Replying to ${replyVars.username}`}</span>
          <button onClick={resetReplyHandler}>✕</button>
        </ReplyMessage>
      )}
      <Section isWide={isWide}>
        {isWide ? (
          <>
            {!isMobile && (
              <EmojiContainer>
                <EmojiModal setText={setComment} />
              </EmojiContainer>
            )}
          </>
        ) : (
          <ProfilePhoto
            height="32px"
            id={viewer?.data?.viewer?.id}
            photoVersion={viewer?.data?.viewer?.photoVersion}
            username={viewer?.data?.viewer?.username}
          />
        )}
        <Form onSubmit={commentReplyToggle} ref={formRef} isWide={isWide}>
          {(commentResult.fetching || replyResult.fetching) && (
            <SpinnerContainer>
              <Spinner size="large" />
            </SpinnerContainer>
          )}

          <TextArea
            onKeyDown={enterPressHandler}
            ref={textAreaRef}
            height={textAreaHeight}
            placeholder="Add a comment..."
            autoComplete="off"
            autoCorrect="off"
            value={comment}
            onChange={changeHandler}
            onFocus={() => setIsFocused(true)}
            onBlur={onBlurHandler}
          ></TextArea>
          <Button isWide={isWide} disabled={comment === ""}>
            Post
          </Button>
        </Form>
      </Section>
      {replyVars?.username && !isWide && (
        <ReplyMessage position={isWide ? "top" : "bottom"}>
          <span>{`Replying to ${replyVars.username}`}</span>
          <button onClick={resetReplyHandler}>✕</button>
        </ReplyMessage>
      )}
      {searchListUser && (
        <ProfileListTextInput
          position={isWide ? "top" : "bottom"}
          getUsername={insertSearch}
          profiles={searchListUser}
        />
      )}
      {searchListTag && (
        <TagListTextInput
          position={isWide ? "top" : "bottom"}
          insertSearch={insertSearch}
          tags={searchListTag}
        />
      )}
    </div>
  );
};
