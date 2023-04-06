import React, { useContext } from "react";
import { CheckmarkContainer, Container, SelectButton } from "./styled";
import { PhotoGridItem } from "./PhotoGridItem";
import { PreloadLink } from "../PreloadLink";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { ReactComponent as CheckmarkSvg } from "../../assets/svgs/checkmark.svg";
import { LocationState } from "../../App";
import { ModalContext, ModalContextI } from "../../context/ModalContext";

export type GridPostType = {
  photos: { id: string; aspectRatio: number }[];
  id: string;
  text: string;
  counts: { likes: number; comments: number };
};

interface Props {
  posts: GridPostType[];
  postIds?: string[];
  setPostIds?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PhotoGrid: React.FC<Props> = ({ posts, postIds, setPostIds }) => {
  const location = useLocation();
  const { resultPost, isMobile } = useGlobalContext() as globalContextType;
  const modalContext = useContext(ModalContext) as ModalContextI;

  const selectPostIdsHandler = (postId: string) => {
    if (postIds === undefined || !setPostIds) return;

    const newArray = [...postIds];
    const postIndex = newArray.findIndex((id) => id === postId);
    if (postIndex !== -1) {
      newArray.splice(postIndex, 1);
    } else {
      newArray.push(postId);
    }
    setPostIds(newArray);
  };

  return (
    <Container isModal={modalContext?.isModal}>
      {posts?.map((post) => {
        const { aspectRatio } = post.photos[0];
        const isSelected = postIds?.includes(post.id);

        switch (true) {
          case Boolean(setPostIds) && postIds !== undefined:
            return (
              <SelectButton
                key={post.id}
                onClick={() => selectPostIdsHandler(post.id)}
              >
                {isSelected && (
                  <CheckmarkContainer>
                    <CheckmarkSvg />
                  </CheckmarkContainer>
                )}
                <PhotoGridItem
                  key={post.id}
                  post={post}
                  isWithoutHover={true}
                />
              </SelectButton>
            );

          case isMobile === true:
            return (
              <PreloadLink
                key={post.id}
                query={PreloadQuery.post}
                queryResult={resultPost}
                to={`/p/${post.id}/`}
                variables={{ postId: post.id, limit: 16, skip: 0 }}
              >
                <PhotoGridItem key={post.id} post={post} />
              </PreloadLink>
            );

          case isMobile === false:
            return (
              <Link
                key={post.id}
                to={`/p/${post.id}/`}
                state={{ background: location.pathname, aspectRatio }}
              >
                <PhotoGridItem key={post.id} post={post} />
              </Link>
            );

          default:
            return <></>;
        }
      })}
    </Container>
  );
};
