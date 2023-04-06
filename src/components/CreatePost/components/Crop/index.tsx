import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ImageContainer } from "../../../../routes/Accounts/styled";
import { Container, FileLimitWarning } from "./styled";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../context/GlobalContext";
import { NavigationButtons } from "./NavigationButtons";
import { ClickCatch } from "../../../Navigation/styled";
import { AspectRatioModal } from "./AspectRatioModal";
import { usePhotoMovement } from "../../../../hooks/usePhotoMovement";
import { ZoomModal } from "./ZoomModal";
import { GalleryModal } from "./GalleryModal";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../context/CreatePostContext";
import { Grid } from "../../../../routes/Create/Style/components/Grid";
import useWindowSize from "../../../../hooks/useWindowSize";

export type AspectRatioType = "original" | "1:1" | "4:5" | "16:9";

interface Props {}

export type MenuStateType = {
  isRatioMenuOpen: boolean;
  isZoomMenuOpen: boolean;
  isGalleryMenuOpen: boolean;
  isMenuAnimating: boolean;
  isWaiting: string;
};

export type MenuStateAction = {
  type:
    | "animate"
    | "visible-ratio"
    | "visible-zoom"
    | "visible-gallery"
    | "reset";
  payload: boolean;
};

const intialMenuState = {
  isRatioMenuOpen: false,
  isZoomMenuOpen: false,
  isGalleryMenuOpen: false,
  isMenuAnimating: false,
  isWaiting: "",
};

function MenuReducer(state: MenuStateType, action: MenuStateAction) {
  const { type, payload } = action;
  switch (type) {
    case "animate":
      return {
        ...state,
        isMenuAnimating: payload,
      };

    case "visible-ratio":
      if (state.isZoomMenuOpen || state.isGalleryMenuOpen)
        return {
          ...state,
          isMenuAnimating: true,
          isWaiting: "visible-ratio",
        };
      return {
        ...state,
        isRatioMenuOpen: payload,
      };

    case "visible-zoom":
      if (state.isRatioMenuOpen || state.isGalleryMenuOpen)
        return {
          ...state,
          isMenuAnimating: true,
          isWaiting: "visible-zoom",
        };
      return {
        ...state,
        isZoomMenuOpen: payload,
      };

    case "visible-gallery":
      if (state.isRatioMenuOpen || state.isZoomMenuOpen)
        return {
          ...state,
          isMenuAnimating: true,
          isWaiting: "visible-gallery",
        };
      return {
        ...state,
        isGalleryMenuOpen: payload,
      };

    case "reset":
      switch (state.isWaiting) {
        case "visible-ratio":
          return {
            ...intialMenuState,
            isRatioMenuOpen: true,
          };

        case "visible-zoom":
          return {
            ...intialMenuState,
            isZoomMenuOpen: true,
          };

        case "visible-gallery":
          return {
            ...intialMenuState,
            isGalleryMenuOpen: true,
          };

        default:
          return intialMenuState;
      }

    default:
      return intialMenuState;
  }
}

export const Crop: React.FC<Props> = () => {
  const { height } = useWindowSize();
  const [menuState, menuDispatch] = useReducer(MenuReducer, intialMenuState);

  const { urlFiles } = useGlobalContext() as globalContextType;
  const {
    fileOverflow,
    setFileOverflow,
    selectedIndex,
    selectedAspectRatio,
    currentPage,
  } = useContext(CreatePostContext) as CreatePostContextType;
  const { values } = urlFiles[selectedIndex];

  const containerRef = useRef<HTMLDivElement>(null);

  const [handleZoom, photoRef, isMouseMove] = usePhotoMovement({
    windowHeight: height - 88 > 855 ? 855 : height - 88,
    selectedAspectRatio,
    selectedFile: urlFiles[selectedIndex],
    selectedIndex: selectedIndex,
  });

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const mouseDownHandler = () => {
    if (
      menuState.isRatioMenuOpen ||
      menuState.isZoomMenuOpen ||
      menuState.isGalleryMenuOpen
    )
      menuDispatch({ type: "animate", payload: true });
  };

  useEffect(() => {
    if (fileOverflow)
      setTimeout(() => {
        setFileOverflow(0);
      }, 6000);
  }, [fileOverflow]);

  return (
    <Container
      ref={containerRef}
      isFirstLoad={isFirstLoad}
      isDisplay={currentPage !== "crop"}
      onAnimationEnd={() => setIsFirstLoad(false)}
      onMouseDown={mouseDownHandler}
    >
      {fileOverflow !== 0 && (
        <FileLimitWarning>{`${fileOverflow} ${
          fileOverflow === 1 ? "file was" : "files were"
        } not uploaded, you can only choose 10 or fewer`}</FileLimitWarning>
      )}

      <ImageContainer
        style={{
          width: values.frameWidth,
          height: values.frameHeight,
        }}
      >
        <div
          ref={photoRef}
          style={{
            backgroundImage: `url(${urlFiles[selectedIndex].url})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
            height: values.height,
            width: values.width,
            transform: `translate3d(${values.x}px, ${values.y}px, 0px) scale(${
              values.zoom / 100 + 1
            })`,
          }}
        ></div>
      </ImageContainer>
      {isMouseMove && <Grid />}
      <NavigationButtons />
      <AspectRatioModal menuState={menuState} menuDispatch={menuDispatch} />
      <ZoomModal
        menuState={menuState}
        menuDispatch={menuDispatch}
        values={values}
        handleZoom={handleZoom}
      />
      <GalleryModal menuState={menuState} menuDispatch={menuDispatch} />
      {isMouseMove && <ClickCatch></ClickCatch>}
    </Container>
  );
};
