import React, { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { ReactComponent as EmojiSvg } from "../../../assets/svgs/emoji.svg";
import { useTextInputSearch } from "../../../hooks/useTextInputSearch";
import { TextArea } from "../../../routes/Post/Comments/components/CommentInput/styled";
import { Button, Form, Section } from "./styled";

interface Props {}

export const CommentInput: React.FC<Props> = () => {
  const [comment, setComment] = useState("");
  const {
    insertSearch,
    isFocused,
    searchListTag,
    searchListUser,
    searchType,
    setIsFocused,
    textAreaRef,
    textChangeHandler,
  } = useTextInputSearch(comment, setComment);
  const [textAreaHeight, setTextAreaHeight] = useState(18);
  const formRef = useRef<HTMLFormElement>(null);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setTextAreaHeight(1);
  };

  useLayoutEffect(() => {
    const scrollHeight = textAreaRef.current?.scrollHeight;
    if (scrollHeight !== textAreaHeight && scrollHeight)
      setTextAreaHeight(scrollHeight);
  }, [comment]);

  const enterPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <Section>
      <Form>
        <Button>
          <EmojiSvg />
        </Button>
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
          onBlur={() => setIsFocused(false)}
        ></TextArea>
        <Button>Post</Button>
      </Form>
    </Section>
  );
};
