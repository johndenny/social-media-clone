import React from "react";
import { useLocation } from "react-router-dom";
import { LocationState } from "../../App";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { ProfilePhotoPlaceholder } from "../ProfilePhoto/styled";
import { Header, LeftHeader } from "./components/PostHeader/styled";
import {
  Article,
  ButtonList,
  Footer,
  PhotoPlaceholder,
  TextPlaceholder,
  TextSection,
} from "./styled";

interface Props {}

export const PostPlaceholder: React.FC<Props> = () => {
  const location = useLocation();
  const { isMobile } = useGlobalContext() as globalContextType;
  return (
    <Article>
      <Header>
        <LeftHeader
          isMobile={
            isMobile ||
            (location.state as LocationState)?.background !== undefined
          }
        >
          <ProfilePhotoPlaceholder height={32}></ProfilePhotoPlaceholder>
          <TextPlaceholder width={82} />
        </LeftHeader>
      </Header>
      <PhotoPlaceholder />

      <Footer>
        <TextSection>
          <TextPlaceholder width={100}></TextPlaceholder>
          <TextPlaceholder width={132}></TextPlaceholder>
        </TextSection>
      </Footer>
    </Article>
  );
};
