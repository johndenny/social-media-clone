import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import { SavedPosts } from "../../../graphQL/queries/SavedPosts";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { PhotoGridPage } from "../../../components/PhotoGrid/PhotoGridPage";
import { Placeholder } from "./Placeholder";
import { Header, NewCollectionText, SecondaryText } from "./styled";
import { PreloadLink } from "../../../components/PreloadLink";
import { ViewerCollections } from "../../../graphQL/queries";
import { ModalContext, ModalContextI } from "../../../context/ModalContext";

interface Props {
  postIds?: string[];
  setPostIds?: React.Dispatch<React.SetStateAction<string[]>>;
  isSaved?: boolean;
}

export const Saved: React.FC<Props> = ({ postIds, setPostIds, isSaved }) => {
  const params = useParams();
  const modalContext = useContext(ModalContext) as ModalContextI;
  const { isMobile, viewer, resultSavedPosts } =
    useGlobalContext() as globalContextType;
  const savedPosts = resultSavedPosts.data?.savedPostsPaged.posts;
  const { isCollection } = viewer.data?.viewer;
  const isModal = modalContext?.isModal;

  const { scrollRef, viewportRef, scrollDispatch, scrollState } =
    useInfinitePagination({
      limit: 12,
      type: isModal ? "modal" : undefined,
    });

  if (params.username && viewer?.data?.viewer?.username !== params.username)
    return <Navigate to={`/${params.username}/`} />;

  return (
    <div ref={viewportRef} style={{ flex: 1, minHeight: 0 }}>
      <div
        ref={scrollRef}
        style={{
          flex: `${isMobile ? undefined : 1}`,
          minHeight: 0,
          overflow: "auto",
        }}
      >
        {Boolean(setPostIds) === false && !isSaved && (
          <Header>
            <SecondaryText>Only you can see what you've saved</SecondaryText>
            <PreloadLink
              to={"new_collection/"}
              query={PreloadQuery.savedPosts}
              queryResult={resultSavedPosts}
              variables={{ limit: 12, skip: 0 }}
              state={
                isMobile
                  ? undefined
                  : { background: `/${params.username}/saved/` }
              }
            >
              <NewCollectionText> + New Collection</NewCollectionText>
            </PreloadLink>
          </Header>
        )}
        {savedPosts?.length === 0 && !isCollection ? (
          <Placeholder />
        ) : (
          <>
            {isCollection && !isSaved ? (
              <>
                {scrollState.moreVars.map((vars, index) => {
                  return (
                    <PhotoGridPage
                      key={index + vars.skip}
                      query={ViewerCollections}
                      queryName={"collectionsPaged"}
                      variables={vars}
                      scrollDispatch={scrollDispatch}
                      isCollection={true}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {savedPosts?.length === 0 && <Placeholder />}
                {scrollState.moreVars.map((vars, index) => {
                  return (
                    <PhotoGridPage
                      key={index + vars.skip}
                      query={SavedPosts}
                      queryName={"savedPostsPaged"}
                      variables={vars}
                      scrollDispatch={scrollDispatch}
                      postIds={postIds}
                      setPostIds={setPostIds}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
