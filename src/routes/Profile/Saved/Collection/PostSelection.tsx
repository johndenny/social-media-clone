import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "urql";
import { Collection } from ".";
import { Saved } from "..";
import {
  HeaderMobile,
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../../components/HeaderMobile";
import { globalContextType } from "../../../../context/GlobalContext";
import {
  AddCollectionPosts,
  DeleteCollectionPosts,
} from "../../../../graphQL/mutations";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { FooterButton } from "../NewCollection/styled";

interface Props {
  type: "add" | "delete";
}

export const PostSelection: React.FC<Props> = ({ type }) => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    setModalAttrs,
    setHeaderAttrs,
    setIsFooterNavHidden,
    isMobile,
    setFooterMessage,
  } = useGlobalContext() as globalContextType;
  const [addToCollectionResult, addToCollectionMutation] =
    useMutation(AddCollectionPosts);
  const [deletePostsResult, deletePostsMutation] = useMutation(
    DeleteCollectionPosts
  );
  const [postIds, setPostIds] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (!isMobile) return;

    setIsFooterNavHidden(true);
    setHeaderAttrs({
      leftButton: LeftHeaderButton.close,
      title: type === "add" ? "Add from saved" : "Remove from collection",
      rightButton:
        addToCollectionResult.fetching || deletePostsResult.fetching
          ? RightHeaderButton.fetching
          : RightHeaderButton.done,
      rightOnClick:
        type === "add" ? AddToCollectionHandler : deletePostsHandler,
    });

    return () => {
      setIsFooterNavHidden(false);
    };
  }, [addToCollectionResult.fetching, deletePostsResult.fetching, postIds]);

  const AddToCollectionHandler = () => {
    addToCollectionMutation({
      collectionId: params.collectionId,
      postIds,
    }).then((result) => {
      isMobile
        ? navigate(
            `/${params.username}/saved/${params.collectionName}/${params.collectionId}/`
          )
        : setModalAttrs(null);
      if (result.error) setFooterMessage("Error adding to collection.");
      console.log(result.data);
      if (result.data) setFooterMessage("Collection updated successfully.");
    });
  };

  const deletePostsHandler = () => {
    deletePostsMutation({ postIds, collectionId: params.collectionId }).then(
      (result) => {
        isMobile
          ? navigate(
              `/${params.username}/saved/${params.collectionName}/${params.collectionId}/`
            )
          : setModalAttrs(null);
        if (result.error) setFooterMessage("Error deleting from collection.");
        if (result.data) setFooterMessage("Collection updated successfully.");
      }
    );
  };

  return (
    <>
      <HeaderMobile
        title={type === "add" ? "Add from saved" : "Remove from collection"}
        rightButton={RightHeaderButton.close}
        rightOnClick={() => (isMobile ? navigate(-1) : setModalAttrs(null))}
      />
      <div style={!isMobile ? { maxHeight: "500px" } : { flex: 1 }}>
        {type === "delete" && (
          <Collection setPostIds={setPostIds} postIds={postIds} />
        )}
        {type === "add" && (
          <Saved postIds={postIds} setPostIds={setPostIds} isSaved={true} />
        )}
      </div>

      <FooterButton
        onClick={type === "add" ? AddToCollectionHandler : deletePostsHandler}
        disabled={postIds.length === 0}
      >
        Done
      </FooterButton>
    </>
  );
};
