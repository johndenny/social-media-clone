import React from "react";
import { useMutation } from "urql";
import {
  CreatePostContextType,
  useCreateContextWide,
} from "../../../context/CreatePostContext";
import { globalContextType } from "../../../context/GlobalContext";
import { HideTag, ShowTag } from "../../../graphQL/mutations";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { PostValues } from "../../PostItem";
import { Spinner } from "../../Spinner";
import { BackDrop, Container, ModalButton } from "../styled";

interface Props {
  post: PostValues;
}

export const PostOptions: React.FC<Props> = ({ post }) => {
  const { setModalAttrs, viewer, isMobile, setFooterMessage } =
    useGlobalContext() as globalContextType;
  const { setPostToEdit } = useCreateContextWide() as CreatePostContextType;
  const [hideTagResult, hideTagMutation] = useMutation(HideTag);
  const [showTagResult, showTagMutation] = useMutation(ShowTag);
  const isPostedByViewer = viewer.data?.viewer.id === post.postedBy.id;
  const isTagFetching = hideTagResult.fetching || showTagResult.fetching;

  const editHandler = () => {
    setModalAttrs(null);
    setPostToEdit(post);
  };

  const hideTagToggle = () => {
    const tagMutation = post.isTagHidden ? showTagMutation : hideTagMutation;

    tagMutation({ postId: post.id }).then((result) => {
      setModalAttrs(null);
      if (result.error) setFooterMessage("Error hiding tag.");
      if (result.data)
        setFooterMessage(
          post.isTagHidden
            ? "Tagged post added to your profile."
            : "Tagged post hidden from your profile."
        );
    });
  };

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        {isPostedByViewer && (
          <>
            <ModalButton
              onClick={() =>
                setModalAttrs({
                  type: "post-delete",
                  variables: { id: post.id },
                })
              }
              color="--error"
            >
              Delete
            </ModalButton>
            {!isMobile && (
              <ModalButton
                color="--primary-text"
                weight="400"
                onClick={editHandler}
              >
                Edit
              </ModalButton>
            )}
          </>
        )}
        {post.isTagged && (
          <>
            <ModalButton
              onClick={() =>
                setModalAttrs({ type: "delete-tag", variables: { post } })
              }
              color="--error"
              weight="600"
            >
              Remove tag from post
            </ModalButton>
            <ModalButton
              onClick={hideTagToggle}
              color="--primary-text"
              weight="400"
            >
              {isTagFetching ? (
                <Spinner size="small" />
              ) : post.isTagHidden ? (
                "Show on your tagged posts"
              ) : (
                "Hide from your tagged posts"
              )}
            </ModalButton>
          </>
        )}

        <ModalButton color="--primary-text" weight="400">
          Go to post
        </ModalButton>
        <ModalButton color="--primary-text" weight="400">
          Copy link
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
