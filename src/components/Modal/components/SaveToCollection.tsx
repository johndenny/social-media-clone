import React from "react";
import { SaveToNewCollectionVariablesI } from "..";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { CollectionsRows } from "./CollectionsRow";
import { SlideUp } from "./SlideUp";

interface Props {
  id: string;
  isCollected: boolean;
}

export const SaveToCollection: React.FC<Props> = ({ id, isCollected }) => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  return (
    <SlideUp
      title="Save to"
      contentHeight={190}
      isCollection={true}
      rightButton="plus"
      rightOnClick={() =>
        setModalAttrs((prevState) => {
          return {
            type: "save-to-new-collection",
            variables: prevState?.variables as SaveToNewCollectionVariablesI,
          };
        })
      }
    >
      <CollectionsRows postId={id} isCollected={isCollected} />
    </SlideUp>
  );
};
