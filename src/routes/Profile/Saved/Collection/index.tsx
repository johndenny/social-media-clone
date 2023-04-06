import React, { useContext, useEffect, useLayoutEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../../components/HeaderMobile";
import { PhotoGrid } from "../../../../components/PhotoGrid";
import { PhotoGridPage } from "../../../../components/PhotoGrid/PhotoGridPage";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../context/GlobalContext";
import { UniqueCollection } from "../../../../graphQL/queries";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { useInfinitePagination } from "../../../../hooks/useInfinitePagination";
import { ReactComponent as SplashScreenSvg } from "../../../../assets/svgs/splashScreen.svg";
import { Container } from "../../styled";
import { CollectionHeader } from "./CollectionHeader";
import { ModalContext, ModalContextI } from "../../../../context/ModalContext";
import { Placeholder } from "./Placeholder";

interface Props {
  postIds?: string[];
  setPostIds?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Collection: React.FC<Props> = ({ postIds, setPostIds }) => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    isMobile,
    setHeaderAttrs,
    viewer,
    queryVarsDispatch,
    resultUniqueCollection,
    setModalAttrs,
  } = useGlobalContext() as globalContextType;
  const modalContext = useContext(ModalContext) as ModalContextI;
  const { data } = resultUniqueCollection;
  const { scrollDispatch, scrollRef, scrollState, viewportRef } =
    useInfinitePagination({
      limit: 12,
    });
  const collection = data?.uniqueCollection;
  const collectionPagedPosts = collection?.pagedPosts;
  const isViewersUsername = viewer.data?.viewer.username === params.username;
  const isParamsNameCorrect = params.collectionName === collection?.nameLink;

  useLayoutEffect(() => {
    document.title = `@${collection?.name} • Instagram`;
    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      leftOnClick: () => navigate(`/${params.username}/saved/`),
      title: collection?.name,
      rightButton: RightHeaderButton.optionsDots,
      rightOnClick: () =>
        setModalAttrs({
          type: "collection-options",
          variables: { id: params?.collectionId || "" },
        }),
    });
  }, [collection]);

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.uniqueCollection,
        variables: { collectionId: params.collectionId, limit: 12, skip: 0 },
      },
    });
  }, []);

  if (resultUniqueCollection.error)
    return <Navigate to={`/${params.username}/saved/`} />;

  if (!isViewersUsername) return <Navigate to={`/${params.username}/`} />;

  if (!isParamsNameCorrect)
    return (
      <Navigate
        to={`/${params.username}/saved/${collection?.nameLink}/${params?.collectionId}/`}
      />
    );

  return (
    <Container ref={viewportRef} isModal={modalContext?.isModal}>
      {!isMobile && !modalContext?.isModal && (
        <CollectionHeader collection={collection} />
      )}
      {collectionPagedPosts.posts.length === 0 && <Placeholder />}
      <div ref={scrollRef}>
        {scrollState.moreVars.map((vars, index) => {
          return (
            <PhotoGridPage
              key={index + vars.skip + vars.limit}
              variables={{ ...vars, collectionId: params.collectionId }}
              scrollDispatch={scrollDispatch}
              postIds={postIds}
              setPostIds={setPostIds}
              query={UniqueCollection}
              queryName={"uniqueCollection"}
              pageName={"pagedPosts"}
            />
          );
        })}
      </div>
    </Container>
  );
};
