import React, { useLayoutEffect, useRef, useState } from "react";
import { useMutation } from "urql";
import {
  HeaderMobile,
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../../components/HeaderMobile";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { FooterButton, Input, Padding } from "../NewCollection/styled";
import { EditCollection as EditCollectionMutation } from "../../../../graphQL/mutations";
import { useNavigate, useParams } from "react-router-dom";
import { BackDrop } from "../../../Create/Details/styled";

interface Props {}

export const EditCollection: React.FC<Props> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    setHeaderAttrs,
    setIsFooterNavHidden,
    isMobile,
    resultUniqueCollection,
    setFooterMessage,
    setModalAttrs,
  } = useGlobalContext() as globalContextType;
  const [editCollectionResult, editCollectionMutation] = useMutation(
    EditCollectionMutation
  );
  const [nameText, setNameText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    if (!isMobile) return;

    setIsFooterNavHidden(true);
    setHeaderAttrs({
      leftButton: LeftHeaderButton.close,
      title: "Edit collection",
      rightButton: editCollectionResult.fetching
        ? RightHeaderButton.fetching
        : RightHeaderButton.done,
      rightOnClick: editHandler,
    });

    return () => {
      setIsFooterNavHidden(false);
    };
  }, [nameText, editCollectionResult.fetching]);

  useLayoutEffect(() => {
    if (!resultUniqueCollection.data) return;

    setNameText(resultUniqueCollection.data.uniqueCollection.name);
  }, [resultUniqueCollection.data]);

  const editHandler = () => {
    editCollectionMutation({
      name: nameText,
      collectionId: params.collectionId,
    }).then((result) => {
      isMobile
        ? navigate(
            `/${params.username}/saved/${params.collectionName}/${params.collectionId}/`
          )
        : setModalAttrs(null);
      if (result.error) setFooterMessage("Error editing collection.");
      if (result.data) setFooterMessage("Collection updated successfully.");
    });
  };

  return (
    <>
      {!isMobile && (
        <HeaderMobile
          title="Edit collection name"
          rightButton={RightHeaderButton.close}
          rightOnClick={() => setModalAttrs(null)}
        />
      )}
      <Padding>
        <Input
          ref={inputRef}
          placeholder="Collection Name"
          type="text"
          autoComplete="off"
          onChange={(e) => setNameText(e.currentTarget.value)}
          value={nameText}
        />
      </Padding>
      {!isMobile && <FooterButton onClick={editHandler}>Done</FooterButton>}
    </>
  );
};
