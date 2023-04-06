import React from "react";
import { PhotosPlaceholder } from "../../../components/PhotosPlaceholder";
import {
  Container,
  Header,
  Paragraph,
} from "../../../components/PhotosPlaceholder/styled";
import { TaggedIcon } from "./styled";

interface Props {
  isViewingOwnProfile: boolean;
}

export const PlaceHolder: React.FC<Props> = ({ isViewingOwnProfile }) => {
  return isViewingOwnProfile ? (
    <article>
      <Container>
        <TaggedIcon></TaggedIcon>
        <Header>Photos of you</Header>
        <Paragraph>
          When people tag you in photos, they'll appear here.
        </Paragraph>
      </Container>
    </article>
  ) : (
    <PhotosPlaceholder isViewingOwnProfile={isViewingOwnProfile} />
  );
};
