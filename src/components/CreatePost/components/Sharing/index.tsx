import React, { useContext } from "react";
import { Container, Title } from "./styled";
import PostSpinnerGif from "../../../../assets/images/createPostSpinner.gif";
import PostSharedGif from "../../../../assets/images/postShared.gif";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../context/CreatePostContext";

interface Props {}

export const Sharing: React.FC<Props> = () => {
  const { uploadPostResult } = useContext(
    CreatePostContext
  ) as CreatePostContextType;
  const { data } = uploadPostResult;

  return (
    <Container>
      <img alt="" src={data ? PostSharedGif : PostSpinnerGif} />
      {data && <Title>Your post has been shared</Title>}
    </Container>
  );
};
