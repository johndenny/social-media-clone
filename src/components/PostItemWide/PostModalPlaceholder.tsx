import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { Header, LeftHeader } from "../PostItem/components/PostHeader/styled";
import { Footer, TextPlaceholder, TextSection } from "../PostItem/styled";
import { ProfilePhotoPlaceholder } from "../ProfilePhoto/styled";
import {
  Article,
  Container,
  FooterPlaceholder,
  PhotoPlaceholder,
  PostDetails,
} from "./styled";

export interface LocationState {
  aspectRatio: number;
}

interface Props {}

export const PostModalPlaceholder: React.FC<Props> = () => {
  const location = useLocation();
  const { height } = useWindowSize();

  return (
    <Container isModal={true} isMobile={false}>
      <Article height={height - 60}>
        <PhotoPlaceholder
          aspectRatio={(location.state as LocationState)?.aspectRatio}
        ></PhotoPlaceholder>
        <PostDetails isModal={true}>
          <Header
            style={{
              borderBottom: "1px solid rgb(var(--highlight-background))",
            }}
          >
            <LeftHeader isMobile={true}>
              <ProfilePhotoPlaceholder height={32}></ProfilePhotoPlaceholder>
              <TextPlaceholder width={82} />
            </LeftHeader>
          </Header>
          <FooterPlaceholder>
            <TextSection>
              <TextPlaceholder width={100}></TextPlaceholder>
              <TextPlaceholder width={132}></TextPlaceholder>
            </TextSection>
          </FooterPlaceholder>
        </PostDetails>
      </Article>
    </Container>
  );
};
