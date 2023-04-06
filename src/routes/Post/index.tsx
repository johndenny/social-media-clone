import React, { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PostItem } from "../../components/PostItem";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { ReactComponent as SplashScreenSvg } from "../../assets/svgs/splashScreen.svg";
import { LeftHeaderButton } from "../../components/HeaderMobile";
import useWindowSize from "../../hooks/useWindowSize";
import { LocationState } from "../../App";
import { Modal } from "../../components/Modal";
import { Navigation } from "../../components/Navigation";
import { ProfileRoot } from "../Profile/ProfileRoot";
import {
  Container,
  MorePostHeader,
} from "../../components/PostItemWide/styled";

interface Props {}

export const Post: React.FC<Props> = () => {
  const { width } = useWindowSize();
  const params = useParams();
  const location = useLocation();
  const { setHeaderAttrs, queryVarsDispatch, resultPost, viewer, isMobile } =
    useGlobalContext() as globalContextType;
  const isLoggedIn = Boolean(viewer.data);
  const username = resultPost.data?.uniquePost.postedBy.username;

  useLayoutEffect(() => {
    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Photo",
    });

    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.post,
        variables: { postId: params.postId },
      },
    });
  }, []);

  if ((location.state as LocationState)?.background)
    return <Modal type="post" variables={undefined} />;

  if (!resultPost.data) return <SplashScreenSvg />;
  return (
    <>
      {!isMobile && !isLoggedIn && <Navigation />}
      <Container isModal={false} isMobile={isMobile}>
        <PostItem
          postValues={resultPost.data.uniquePost}
          isWide={width > 735}
        />
        {!isMobile && (
          <>
            <MorePostHeader>
              {`More posts from `}
              <span style={{ color: "rgb(var(--primary-text))" }}>
                {username}
              </span>
            </MorePostHeader>
            <ProfileRoot username={username} />
          </>
        )}
      </Container>
    </>
  );
};
