import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType } from "../../context/GlobalContext";
import { FooterPopUp } from "../FooterPopUp";
import { Container } from "./styled";
import { HeaderMobile } from "../HeaderMobile";
import { FooterMobile } from "../FooterMobile";
import { LoadingBar } from "./styled/LoadingBar";
import { Modal } from "../Modal";
import { Navigation } from "../Navigation";
import { ProfileModal } from "../ProfileModal";
import { CreatePostDataProvider } from "../../context/CreatePostContext";
import { ReactComponent as SplashScreenSvg } from "../../assets/svgs/splashScreen.svg";
import { ModalContextDataProvider } from "../../context/ModalContext";

const Layout: React.FC = () => {
  const {
    viewer,
    isMobile,
    headerAttrs,
    footerMessage,
    setFooterMessage,
    queryVarsState,
    isFooterNavHidden,
    modalAttrs,
    profileModalAttrs,
    isCreatePostOpen,
    isModal,
  } = useGlobalContext() as globalContextType;
  const isLoggedIn = Boolean(viewer.data);

  if (viewer.fetching) return <SplashScreenSvg />;

  return (
    <Container isMobile={isMobile} isModal={isModal}>
      {!isMobile && profileModalAttrs && (
        <ProfileModal {...profileModalAttrs} />
      )}
      {!isMobile && isLoggedIn && <Navigation />}
      {queryVarsState.isPreload && <LoadingBar></LoadingBar>}
      {isMobile && <HeaderMobile {...headerAttrs} />}

      <Outlet />

      <FooterPopUp
        isMobile={isMobile}
        isLoggedIn={isLoggedIn}
        footerMessage={footerMessage}
        setFooterMessage={setFooterMessage}
      />
      {isMobile && viewer.data?.viewer && !isFooterNavHidden && (
        <FooterMobile user={viewer?.data?.viewer} />
      )}
      <CreatePostDataProvider>
        {modalAttrs && (
          <ModalContextDataProvider>
            <Modal {...modalAttrs} />
          </ModalContextDataProvider>
        )}

        {isCreatePostOpen && <Modal type="create-post" />}
      </CreatePostDataProvider>
    </Container>
  );
};

export default Layout;
