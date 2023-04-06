import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import React from "react";
import { CollectionI } from "../../../../../routes/Profile/Saved/components/CollectionItem";
import { Img } from "../../../../../styled";
import { cld } from "../../../../../utils/cloudinaryConfig";
import { Container, Span, Thumbnail } from "./styled";
import { ReactComponent as SelectedSvg } from "../../../../../assets/svgs/selected.svg";
import { ReactComponent as UnselectedSvg } from "../../../../../assets/svgs/unselected.svg";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../../context/GlobalContext";

interface Props {
  collection: CollectionI;
  postId: string;
  setSaveButtonLocation: React.Dispatch<React.SetStateAction<number | null>>;
}

export const CollectionItem: React.FC<Props> = ({
  collection,
  postId,
  setSaveButtonLocation,
}) => {
  const { removeCollectionPostHandler, saveToCollectionHandler } =
    useGlobalContext() as globalContextType;
  const firstPhotoId = collection.posts[0]?.photos[0].id || undefined;
  const firstPhoto = cld
    .image(firstPhotoId)
    .resize(thumbnail().width(60).height(60));

  const onClickHandler = () => {
    setSaveButtonLocation(null);
    if (postId)
      return collection.isCollected
        ? removeCollectionPostHandler(postId, collection)
        : saveToCollectionHandler(postId, collection);
  };

  return (
    <Container onClick={onClickHandler}>
      <Thumbnail>
        {firstPhotoId && <Img alt="" src={firstPhoto.toURL()} />}
      </Thumbnail>
      <Span style={{ fontWeight: collection.isCollected ? 600 : undefined }}>
        {collection.name}
      </Span>
      <span style={{ marginLeft: "auto", paddingRight: "8px" }}>
        {collection.isCollected ? (
          <SelectedSvg height={18} width={18} />
        ) : (
          <UnselectedSvg height={18} width={18} />
        )}
      </span>
    </Container>
  );
};
