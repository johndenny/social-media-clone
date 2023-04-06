import React from "react";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { Button } from "../../../../styled";
import { Container, Header, Paragraph, PhotoIcon } from "./styled";

interface Props {
  isViewingOwnProfile: boolean;
}

export const PhotosPlaceholder: React.FC<Props> = ({ isViewingOwnProfile }) => {
  const { setIsCreatePostOpen } = useGlobalContext() as globalContextType;
  return (
    <article>
      <Container>
        <Button onClick={() => setIsCreatePostOpen(true)}>
          <PhotoIcon></PhotoIcon>
        </Button>
        <Header>{isViewingOwnProfile ? "Share Photos" : "No Photos"}</Header>
        {isViewingOwnProfile && (
          <>
            <Paragraph>
              When you share photos, they will appear on your profile.
            </Paragraph>
            <Button onClick={() => setIsCreatePostOpen(true)}>
              Share your first photo
            </Button>
          </>
        )}
      </Container>
    </article>
  );
};
