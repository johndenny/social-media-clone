import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Button } from "../styled";
import {
  AddPhotoButton,
  ChevronSprite,
  Container,
  GalleryContainer,
  NavigationButton,
  NavigationContainer,
  Placeholder,
} from "./styled";
import { ReactComponent as GallerySvg } from "../../../../../assets/svgs/gallery.svg";
import { ReactComponent as PlusSvg } from "../../../../../assets/svgs/plus.svg";
import { Padding } from "../AspectRatioModal/styled";
import { MenuStateAction, MenuStateType } from "..";
import { MenuContainer } from "./styled/MenuContainer";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../../context/GlobalContext";
import { HiddenFileInput } from "../../../../HiddenFileInput";
import useImageUpload from "../../../../../hooks/useImageUpload";
import { PhotoFile } from "./PhotoFile";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../context/CreatePostContext";
import { Triangle } from "../../../../../styled";
import { InstructionPopUp } from "../../InstructionPopUp";

export interface FileDragStateI {
  draggingIndex?: number;
  dragStartX: number;
  cursorMovementX: number;
  dragMovementX: number;
  filesPassedOver: number;
}

type FileDragActionT =
  | FileDragActionStartI
  | FileDragActionCursorMoveI
  | FileDragActionFileMoveI
  | FileDragActionResetI;

interface FileDragActionStartI {
  type: "start";
  payload: { x: number; index: number };
}

interface FileDragActionCursorMoveI {
  type: "cursor-move";
  payload: { x: number };
}

interface FileDragActionFileMoveI {
  type: "file-move";
  payload: { x: number; filesPassedOver: number };
}

interface FileDragActionResetI {
  type: "reset";
}

const intialFileDragState = {
  draggingIndex: undefined,
  dragStartX: 0,
  cursorMovementX: 0,
  dragMovementX: 0,
  filesPassedOver: 0,
};

function FileDragReducer(state: FileDragStateI, action: FileDragActionT) {
  const { type } = action;
  switch (type) {
    case "start":
      return {
        ...state,
        draggingIndex: action.payload.index,
        dragStartX: action.payload.x,
      };

    case "cursor-move":
      return {
        ...state,
        cursorMovementX: action.payload.x,
      };

    case "file-move":
      return {
        ...state,
        dragMovementX: action.payload.x,
        filesPassedOver: action.payload.filesPassedOver,
      };

    case "reset":
      return intialFileDragState;

    default:
      return intialFileDragState;
  }
}

interface HandleMovementI {
  direction: "left" | "right";
}

interface Props {
  menuState: MenuStateType;
  menuDispatch: React.Dispatch<MenuStateAction>;
}

export const GalleryModal: React.FC<Props> = ({ menuDispatch, menuState }) => {
  const [fileDragState, fileDragDispatch] = useReducer(
    FileDragReducer,
    intialFileDragState
  );
  const { urlFiles, setUrlFiles, modalAttrs } =
    useGlobalContext() as globalContextType;
  const { setSelectedIndex, instructionConsumed } = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const { fileChangeHandler } = useImageUpload();

  const inputRef = useRef<HTMLInputElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const fileClickTimer = useRef<NodeJS.Timeout | null>(null);

  const [galleryXMovement, setGalleryXMovement] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isInstructionVisible, setIsInstructionVisible] = useState(false);
  const [isInstructionAnimating, setIsInstructionAnimating] = useState(false);

  const galleryMovementHandler = ({ direction }: HandleMovementI) => {
    if (!galleryContainerRef.current) return;
    const viewWidth = galleryContainerRef.current?.clientWidth;
    const allPhotosWidth = urlFiles.length * 106;

    if (direction === "right") {
      // if next page is less than viewWidth only move that width
      if (galleryXMovement * -1 + viewWidth * 2 > allPhotosWidth) {
        const maxMovement = galleryXMovement * -1 + viewWidth - allPhotosWidth;
        return setGalleryXMovement((prevState) => prevState + maxMovement);
      }
      setGalleryXMovement((prevState) => prevState - viewWidth);
    }

    if (direction === "left") {
      // if next page is above zero set to zero
      if (galleryXMovement + viewWidth > 0) {
        return setGalleryXMovement(0);
      }
      setGalleryXMovement((prevState) => prevState + viewWidth);
    }
  };

  useEffect(() => {
    //toggles nav buttons if files overflow
    if (!galleryContainerRef.current) return;
    const { clientWidth } = galleryContainerRef.current;

    setIsNavVisible(clientWidth !== urlFiles.length * 106 ? true : false);
  }, [urlFiles]);

  useEffect(() => {
    //if file is removed setstate to reflect that
    if (modalAttrs?.type !== "discard-photo" || !galleryContainerRef.current) {
      return;
    }

    if (galleryContainerRef.current.clientWidth === urlFiles.length * 106)
      return;
    setIsRemoving(true);

    return () => setIsRemoving(false);
  }, [modalAttrs]);

  useLayoutEffect(() => {
    // adjusts translation if file is removed
    if (galleryXMovement === 0 || !isRemoving) return;

    setGalleryXMovement((prevState) =>
      prevState > -106
        ? 0
        : urlFiles.length === 9
        ? prevState + (106 - 60)
        : prevState + 106
    );
  }, [urlFiles]);

  const startDraggingHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setIsInstructionAnimating(true);
    //setTimeout to allow file to be clicked without drag
    fileClickTimer.current = setTimeout(() => {
      fileDragDispatch({
        type: "start",
        payload: { index, x: e.clientX },
      });
    }, 200);
  };

  const fileClickHandler = (index: number) => {
    // clearTimeout to allow click without drag
    if (fileClickTimer.current) clearTimeout(fileClickTimer.current);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (!fileDragState.cursorMovementX || !fileDragState.dragStartX) return;

    const { cursorMovementX, dragStartX } = fileDragState;
    const x = cursorMovementX - dragStartX;

    fileDragDispatch({
      type: "file-move",
      payload: {
        x,
        //first pass over is only half the length of the rest. 53 to compensate.
        filesPassedOver: Math.floor((53 - x) / 106) * -1,
      },
    });
  }, [fileDragState.cursorMovementX]);

  useEffect(() => {
    if (fileDragState.draggingIndex === undefined) return;

    //resets drag values and changes file position in array
    const mouseUpHandler = () => {
      if (fileDragState.draggingIndex === undefined) return;

      const newFileArray = [...urlFiles];
      const oldIndex = fileDragState.draggingIndex;
      let newIndex =
        fileDragState.draggingIndex + fileDragState.filesPassedOver;
      if (newIndex < 0) newIndex = 0;
      if (newIndex > urlFiles.length - 1) newIndex = urlFiles.length - 1;

      if (newIndex !== oldIndex) {
        newFileArray.splice(oldIndex, 1);
        newFileArray.splice(newIndex, 0, urlFiles[oldIndex]);

        setUrlFiles(newFileArray);
        setSelectedIndex(newIndex);
      }

      fileDragDispatch({
        type: "reset",
      });
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      fileDragDispatch({
        type: "cursor-move",
        payload: { x: e.clientX },
      });
    };

    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [fileDragState]);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menuDispatch({
      type: menuState.isGalleryMenuOpen ? "animate" : "visible-gallery",
      payload: true,
    });
  };

  useEffect(() => {
    if (!menuState.isGalleryMenuOpen) return;

    const closeMenu = () => menuDispatch({ type: "animate", payload: true });

    window.addEventListener("click", closeMenu);
    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [menuState.isGalleryMenuOpen]);

  const animationEndHandler = () => {
    if (menuState.isMenuAnimating) {
      menuDispatch({ type: "reset", payload: false });
      setIsInstructionVisible(false);
    } else {
      setTimeout(() => {
        setIsInstructionVisible(true);
      }, 200);
    }
  };

  return (
    <Container>
      {menuState.isGalleryMenuOpen && (
        <Padding
          style={{ maxWidth: "100%" }}
          isAnimating={menuState.isMenuAnimating}
          onAnimationEnd={animationEndHandler}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {isInstructionVisible &&
            !instructionConsumed.gallery &&
            urlFiles.length > 1 && (
              <InstructionPopUp
                type="gallery"
                isAnimating={isInstructionAnimating}
                setAnimationState={setIsInstructionAnimating}
                setVisibleState={setIsInstructionVisible}
              >
                Click and drag to reorder
              </InstructionPopUp>
            )}

          <MenuContainer>
            <NavigationContainer>
              <GalleryContainer ref={galleryContainerRef}>
                <Placeholder
                  style={{
                    height: "94px",
                    width: `${urlFiles.length * 106}px`,
                    transform: `translateX(${galleryXMovement}px)`,
                  }}
                >
                  <div>
                    {urlFiles.map((file, index) => {
                      return (
                        <PhotoFile
                          key={file.url}
                          fileDragState={fileDragState}
                          file={file}
                          index={index}
                          startDraggingHandler={startDraggingHandler}
                          fileClickHandler={fileClickHandler}
                        />
                      );
                    })}
                  </div>
                </Placeholder>
              </GalleryContainer>
              {isNavVisible && (
                <>
                  {galleryXMovement !== 0 && (
                    <NavigationButton
                      left
                      onClick={() =>
                        galleryMovementHandler({ direction: "left" })
                      }
                    >
                      <ChevronSprite left></ChevronSprite>
                    </NavigationButton>
                  )}
                  {galleryContainerRef.current &&
                    galleryXMovement * -1 +
                      galleryContainerRef.current?.clientWidth !==
                      urlFiles.length * 106 && (
                      <NavigationButton
                        right
                        onClick={() =>
                          galleryMovementHandler({ direction: "right" })
                        }
                      >
                        <ChevronSprite right></ChevronSprite>
                      </NavigationButton>
                    )}
                </>
              )}
            </NavigationContainer>

            {urlFiles.length !== 10 && (
              <AddPhotoButton onClick={(e) => inputRef.current?.click()}>
                <PlusSvg />
              </AddPhotoButton>
            )}

            <HiddenFileInput
              fileChangeHandler={fileChangeHandler}
              inputRef={inputRef}
              name={"photo-post"}
              multiple={true}
            />
          </MenuContainer>
        </Padding>
      )}

      <Button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={clickHandler}
        isOpen={menuState.isGalleryMenuOpen}
        isOtherOpen={menuState.isRatioMenuOpen || menuState.isZoomMenuOpen}
      >
        <GallerySvg
          fill={menuState.isGalleryMenuOpen ? "#262626" : "#ffffff"}
        />
      </Button>
    </Container>
  );
};
