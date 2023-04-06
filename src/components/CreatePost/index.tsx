import React, { useContext, useEffect, useRef } from "react";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../context/CreatePostContext";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { usePhotoCanvas } from "../../hooks/usePhotoCanvas";
import useWindowSize from "../../hooks/useWindowSize";
import {
  HeaderMobile,
  LeftHeaderButton,
  RightHeaderButton,
} from "../HeaderMobile";
import { BackDrop } from "../Modal/styled";
import { Crop } from "./components/Crop";
import { Details } from "./components/Details";
import { TagSearchModal } from "./components/Details/TagSearchModal";
import { FileInput } from "./components/FileInput";
import { Filter } from "./components/Filter";
import { Sharing } from "./components/Sharing";
import { Container, ContentContainer, OuterContainer } from "./styled";

interface Props {}

export const CreatePost: React.FC<Props> = () => {
  const { height, width } = useWindowSize();
  const { urlFiles, setUrlFiles, setModalAttrs, setIsCreatePostOpen } =
    useGlobalContext() as globalContextType;
  const {
    editPostResult,
    postEditHandler,
    setSelectedAspectRatio,
    setSelectedIndex,
    currentPage,
    setCurrentPage,
    tagSearchLocation,
    setTagSearchLocation,
    photosToUploadDispatch,
    photosToUploadState,
    setInstructionConsumed,
    setIsCommentsOff,
    uploadPostResult,
    postUploadHandler,
    setText,
    setPostLocation,
    postToEdit,
    setPostToEdit,
  } = useContext(CreatePostContext) as CreatePostContextType;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadAllPhotos, isFetching] = usePhotoCanvas({ canvasRef });

  useEffect(() => {
    return () => {
      photosToUploadDispatch({ type: "clear" });
      setPostToEdit(null);
      setUrlFiles([]);
      setSelectedAspectRatio("1:1");
      setSelectedIndex(0);
      setCurrentPage("crop");
      setInstructionConsumed({ gallery: false, tags: false });
      setIsCommentsOff(false);
      setText("");
      setPostLocation(null);
    };
  }, []);

  const modalWidthHandler = () => {
    const heightBuffer = 88;
    const widthBuffer = 40;
    const menuBarWidth = 340;
    const maxWidth =
      height - heightBuffer > 855
        ? 855 + menuBarWidth
        : height - heightBuffer + menuBarWidth;
    if (
      (urlFiles.length === 0 && !postToEdit) ||
      currentPage === "crop" ||
      currentPage === "sharing"
    )
      return width < height ? width - widthBuffer : height - heightBuffer;
    return width - widthBuffer > maxWidth ? maxWidth : width - widthBuffer;
  };

  const modalMaxWidthHandler = () => {
    if (
      (urlFiles.length === 0 && !postToEdit) ||
      currentPage === "crop" ||
      currentPage === "sharing"
    )
      return 855;
    return width - 40 > 1195 ? 1195 : width - 40;
  };

  return (
    <BackDrop
      onClick={() =>
        urlFiles.length === 0 || currentPage === "sharing"
          ? setIsCreatePostOpen(false)
          : setModalAttrs({ type: "leave-create-post" })
      }
      isSecondary
    >
      {tagSearchLocation && <TagSearchModal />}
      <OuterContainer
        onClick={(e) => {
          e.stopPropagation();
          setTagSearchLocation(null);
        }}
      >
        <Container
          style={{
            width: `${modalWidthHandler()}px`,
            maxWidth: `${modalMaxWidthHandler()}px`,
            maxHeight: "898px",
            minHeight: "391px",
          }}
        >
          {urlFiles.length === 0 && !postToEdit && (
            <HeaderMobile title="Create New Post" />
          )}
          {urlFiles.length !== 0 && currentPage === "crop" && (
            <HeaderMobile
              title="Crop"
              leftButton={LeftHeaderButton.arrow}
              leftOnClick={() => setModalAttrs({ type: "discard-post" })}
              rightButton={
                isFetching ? RightHeaderButton.fetching : RightHeaderButton.next
              }
              rightOnClick={() => loadAllPhotos()}
            />
          )}
          {photosToUploadState.length !== 0 && currentPage === "edit" && (
            <HeaderMobile
              title="Edit"
              leftButton={LeftHeaderButton.arrow}
              leftOnClick={() => {
                setCurrentPage("crop");
              }}
              rightButton={RightHeaderButton.next}
              rightOnClick={() => setCurrentPage("details")}
            />
          )}
          {currentPage === "details" && postToEdit && (
            <HeaderMobile
              title={"Edit post"}
              leftButton={LeftHeaderButton.close}
              leftOnClick={() => setIsCreatePostOpen(false)}
              rightButton={
                editPostResult.fetching
                  ? RightHeaderButton.fetching
                  : RightHeaderButton.done
              }
              rightOnClick={postEditHandler}
            />
          )}
          {currentPage === "details" && !postToEdit && (
            <HeaderMobile
              title={"Create new post"}
              leftButton={LeftHeaderButton.arrow}
              leftOnClick={() => {
                setCurrentPage("edit");
              }}
              rightButton={RightHeaderButton.share}
              rightOnClick={postUploadHandler}
            />
          )}
          {currentPage === "sharing" && (
            <HeaderMobile
              title={uploadPostResult.data ? "Post Shared" : "Sharing"}
            />
          )}
          <ContentContainer>
            {urlFiles.length === 0 && !postToEdit && <FileInput />}
            {urlFiles.length !== 0 && <Crop />}
            {photosToUploadState.length !== 0 && currentPage === "edit" && (
              <Filter canvasRef={canvasRef} />
            )}
            {currentPage === "details" && <Details />}
            {currentPage === "sharing" && <Sharing />}
          </ContentContainer>
        </Container>
      </OuterContainer>
    </BackDrop>
  );
};
