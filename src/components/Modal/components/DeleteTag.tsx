import React from "react";
import { useMutation } from "urql";
import { globalContextType } from "../../../context/GlobalContext";
import { RemoveTag } from "../../../graphQL/mutations";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { PostValues } from "../../PostItem";
import { Spinner } from "../../Spinner";
import {
  BackDrop,
  Container,
  Header,
  HeaderText,
  ModalButton,
  Paragraph,
} from "../styled";

interface Props {
  post: PostValues;
}

export const DeleteTag: React.FC<Props> = ({ post }) => {
  const { setModalAttrs, setFooterMessage } =
    useGlobalContext() as globalContextType;
  const [removeTagResult, removeTagMutation] = useMutation(RemoveTag);

  const removeTagHandler = () => {
    removeTagMutation({ postId: post.id }).then((result) => {
      setModalAttrs(null);
      if (result.error) setFooterMessage("Error removing tag.");
      if (result.data) setFooterMessage("Tag removed successfully");
    });
  };

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>Remove Tag?</HeaderText>
          <Paragraph>
            Are you sure you want to remove your tag from this post?
          </Paragraph>
        </Header>
        <ModalButton onClick={removeTagHandler} color="--error" weight="600">
          {removeTagResult.fetching ? <Spinner size="small" /> : "Delete"}
        </ModalButton>
        <ModalButton
          onClick={() => setModalAttrs(null)}
          weight="400"
          color="--primary-text"
        >
          Cancel
        </ModalButton>
      </Container>
    </BackDrop>
  );
};
