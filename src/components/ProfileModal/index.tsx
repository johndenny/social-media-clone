import React, { useEffect } from "react";
import {
  globalContextType,
  PreloadQuery,
  ProfileModalType,
} from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { ProfilePhoto } from "../ProfilePhoto";
import {
  CameraSprite,
  Circle,
  Container,
  Footer,
  Header,
  ImageContainer,
  InnerContainer,
  LockSprite,
  Paragraph,
  PlaceholderContainer,
  PostContainer,
  Span,
  TextContainer,
} from "./styled";
import { Counts } from "../../routes/Profile/components/Counts";
import { Img } from "../../styled";
import { GridPostType } from "../PhotoGrid";
import { cld } from "../../utils/cloudinaryConfig";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FollowButton } from "../FollowButton";
import { PreloadLink } from "../PreloadLink";
import { UsernameLink } from "../UsernameLink";
import { StyledLink } from "../../routes/Profile/components/Header/styled";

interface Props extends ProfileModalType {}

export const ProfileModal: React.FC<Props> = ({
  username,
  top,
  left,
  position,
}) => {
  const {
    queryVarsDispatch,
    viewer,
    resultUserModal,
    resultPost,
    profileModalTimerRef,
    setProfileModalAttrs,
  } = useGlobalContext() as globalContextType;
  const { data } = resultUserModal;
  const isPrivate =
    !data?.user.isFollowing &&
    data?.user.isPrivate &&
    viewer.data?.viewer.username !== data.user.username;

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.userModal,
        variables: { username, limit: 3, skip: 0 },
      },
    });
  }, []);

  const mouseEnterHandler = () => {
    if (profileModalTimerRef.current)
      clearTimeout(profileModalTimerRef.current);
  };

  const mouseLeaveHandler = () => {
    profileModalTimerRef.current = setTimeout(() => {
      setProfileModalAttrs(null);
    }, 200);
  };

  if (!data || data.user.username !== username) return <></>;

  return (
    <Container
      style={
        position === "bottom"
          ? { top, left }
          : { top, left, transform: "translateY(-100%)" }
      }
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <InnerContainer>
        <Header>
          <ProfilePhoto
            height={"56px"}
            photoVersion={data.user.photoVersion}
            id={data.user.id}
            username={data.user.username}
            isWithoutModal={true}
          />
          <TextContainer>
            <div>
              <UsernameLink
                username={data.user.username}
                isWithoutModal={true}
              />
              {data.user.fullName && (
                <Span style={{ color: "rgb(var(--secondary-text))" }}>
                  {data.user.fullName}
                </Span>
              )}
            </div>
            {data.user.url && (
              <a href={`https://${data.user.url}`}>{data.user.url}</a>
            )}
          </TextContainer>
        </Header>
        <div style={{ pointerEvents: "none" }}>
          <Counts
            isPrivate={isPrivate}
            isViewingOwnProfile={false}
            username={""}
            counts={data.user.counts}
          />
        </div>
        <PostContainer>
          {isPrivate ? (
            <PlaceholderContainer>
              <Circle>
                <LockSprite></LockSprite>
              </Circle>
              <h2 style={{ fontWeight: "600" }}>This Account is Private</h2>
              <Paragraph>Follow to see their photos and videos</Paragraph>
            </PlaceholderContainer>
          ) : (
            <>
              {data.user.postsPage?.posts.length === 0 ? (
                <PlaceholderContainer>
                  <Circle>
                    <CameraSprite></CameraSprite>
                  </Circle>
                  <h2 style={{ fontWeight: "600" }}>No Posts yet</h2>
                  <Paragraph>{`When ${data.user.username} posts, you'll see their photos here.`}</Paragraph>
                </PlaceholderContainer>
              ) : (
                <>
                  {data.user.postsPage?.posts.map((post: GridPostType) => {
                    const image130 = cld
                      .image(post.photos[0].id)
                      .resize(thumbnail().width(130).height(130));
                    return (
                      <PreloadLink
                        key={post.id}
                        to={`/p/${post.id}/`}
                        query={PreloadQuery.post}
                        queryResult={resultPost}
                        variables={{ postId: post.id, limit: 16, skip: 0 }}
                      >
                        <ImageContainer>
                          <Img alt={post.text} src={image130.toURL()} />
                        </ImageContainer>
                      </PreloadLink>
                    );
                  })}
                </>
              )}
            </>
          )}
        </PostContainer>
        <Footer>
          {viewer.data.viewer.username === data.user.username ? (
            <StyledLink to="/accounts/edit/" style={{ maxWidth: "500px" }}>
              Edit profile
            </StyledLink>
          ) : (
            <FollowButton followingId={data.user.id} user={data.user} />
          )}
        </Footer>
      </InnerContainer>
    </Container>
  );
};
