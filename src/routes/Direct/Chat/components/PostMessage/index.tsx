import React from "react";
import { PostValues } from "../../../../../components/PostItem";
import { Container, Footer, Header, Image } from "./styled";
import { cld } from "../../../../../utils/cloudinaryConfig";
import { ProfilePhoto } from "../../../../../components/ProfilePhoto";
import { PreloadLink } from "../../../../../components/PreloadLink";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../../context/GlobalContext";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { MoreText } from "../../../../../components/MoreText";

interface Props {
  post: PostValues;
  isReply?: boolean;
}

export const PostMessage: React.FC<Props> = ({ post, isReply }) => {
  const { user } = useGlobalContext() as globalContextType;
  return (
    <>
      <Header>
        <ProfilePhoto height={"32px"} photoVersion={0} id={""} username={""} />
        <span>{post.postedBy.username}</span>
      </Header>
      <Image
        height={234 / post.photos[0].aspectRatio}
        src={cld.image(post.photos[0].id).toURL()}
      />
      <Footer>
        <PreloadLink
          to={`/${post.postedBy.username}/`}
          query={PreloadQuery.user}
          queryResult={user}
          variables={{ username: post.postedBy.username }}
        >
          {`${post.postedBy.username} `}
        </PreloadLink>
        <MoreText text={post.text} />
      </Footer>
    </>
  );
};
