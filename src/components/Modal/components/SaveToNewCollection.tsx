import React, { useState } from "react";
import { useMutation } from "urql";
import { SaveToCollectionI, SaveToCollectionVariablesI } from "..";
import { globalContextType } from "../../../context/GlobalContext";
import { CreateCollection } from "../../../graphQL/mutations";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { FooterButton } from "../../../routes/Profile/Saved/NewCollection/styled";
import { HeaderMobile, RightHeaderButton } from "../../HeaderMobile";
import { BackDrop, Container } from "../styled";
import { NewCollectionMobile } from "./NewCollectionMobile";
import { SlideUp } from "./SlideUp";

interface Props {
  id: string;
  photoId: string;
}

export const SaveToNewCollection: React.FC<Props> = ({ id, photoId }) => {
  const {
    setModalAttrs,
    isMobile,
    setFooterMessage,
    setSavedPostMutationDetails,
  } = useGlobalContext() as globalContextType;
  const [resultCreateCollection, createCollectionMutation] =
    useMutation(CreateCollection);

  const [newCollectionName, setNewCollectionName] = useState("");

  const createCollectionHandler = () => {
    createCollectionMutation({
      name: newCollectionName,
      newPostId: id,
    }).then((result) => {
      setModalAttrs(null);
      if (result.error) setFooterMessage("Error creating collection.");
      if (result.data)
        setSavedPostMutationDetails({
          postId: id,
          collection: result.data.createCollection.collection,
        });
    });
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/\s$/.test(newCollectionName) && /\s$/.test(e.currentTarget.value))
      return;

    setNewCollectionName(e.currentTarget.value);
  };

  if (!isMobile)
    return (
      <BackDrop onClick={() => setModalAttrs(null)}>
        <Container onClick={(e) => e.stopPropagation()}>
          <HeaderMobile
            title="New collection"
            rightButton={RightHeaderButton.close}
            rightOnClick={() => setModalAttrs(null)}
          />
          <NewCollectionMobile
            photoId={photoId}
            inputChangeHandler={inputChangeHandler}
            newCollectionName={newCollectionName}
          />
          <FooterButton
            onClick={createCollectionHandler}
            disabled={newCollectionName === ""}
          >
            Save
          </FooterButton>
        </Container>
      </BackDrop>
    );

  return (
    <SlideUp
      title="Add Collection"
      contentHeight={190}
      isCollection={true}
      leftButton="back-chevron"
      leftOnClick={() =>
        setModalAttrs((prevState) => {
          return {
            type: "save-to-collection",
            variables: prevState?.variables as SaveToCollectionVariablesI,
          };
        })
      }
      rightButton={resultCreateCollection.fetching ? "fetching" : "save"}
      rightOnClick={newCollectionName ? createCollectionHandler : undefined}
    >
      <NewCollectionMobile
        photoId={photoId}
        inputChangeHandler={inputChangeHandler}
        newCollectionName={newCollectionName}
      />
    </SlideUp>
  );
};
