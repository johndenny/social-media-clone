import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateContext } from "..";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../components/HeaderMobile";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { Filters } from "../../../hooks/useMobilePhotoCanvas";
import { FilterSlider } from "./components/FilterSlider";
import { FooterTabs } from "./components/FooterTabs";
import { Grid } from "./components/Grid";
import {
  Canvas,
  CircleMask,
  Container,
  EditButton,
  ExpandSprite,
  Image,
  ImageContainer,
  Padding,
  RotateSprite,
} from "./styled";

interface Props {}

export const Style: React.FC<Props> = () => {
  const {
    urlFiles,
    setUrlFiles,
    setHeaderAttrs,
    setIsFooterNavHidden,
    uploadProfilePhotoHandler,
    uploadProfilePhotoResult,
  } = useGlobalContext() as globalContextType;
  const {
    canvasRef,
    expandHandler,
    isDragging,
    isExpanded,
    rotateHandler,
    selectedFilter,
    selectedTab,
    setSelectedFilter,
    setSelectedTab,
    values,
    photoRef,
    isFetching,
    loadImageWithFetch,
  } = useCreateContext();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFooterNavHidden(true);
    if (urlFiles[0].type === "profile-photo")
      setHeaderAttrs({
        leftButton: LeftHeaderButton.close,
        leftOnClick: () => navigate(-1),
        title: "Profile Photo",
        rightButton: RightHeaderButton.save,
        rightOnClick: uploadProfilePhotoHandler,
        rightFetch: uploadProfilePhotoResult.fetching,
      });
    if (urlFiles[0].type === "photo-post")
      setHeaderAttrs({
        leftButton: LeftHeaderButton.close,
        leftOnClick: () => navigate(-1),
        title: "New Photo Post",
        rightButton: isFetching
          ? RightHeaderButton.fetching
          : RightHeaderButton.next,
        rightOnClick: nextPageHandler,
      });
    return () => {
      setIsFooterNavHidden(false);
    };
  }, [isFetching, values, selectedFilter, selectedTab]);

  const nextPageHandler = async () => {
    await loadImageWithFetch();
    navigate("/create/details/");
  };

  return (
    <div>
      {urlFiles[0].type === "profile-photo" && <CircleMask></CircleMask>}
      <FooterTabs setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <Container hidden={selectedTab === "edit"}>
        <div>
          <Padding>
            <ImageContainer>
              <Canvas ref={canvasRef}></Canvas>
            </ImageContainer>
          </Padding>
        </div>
        <FilterSlider
          selectedFilter={selectedFilter as Filters}
          setSelectedFilter={
            setSelectedFilter as Dispatch<SetStateAction<Filters>>
          }
        />
      </Container>
      <Container hidden={selectedTab === "filter"}>
        <Padding>
          <ImageContainer>
            <Image
              ref={photoRef}
              url={urlFiles[0].url}
              height={values.height}
              left={values.left}
              origin={values.origin}
              rotate={values.rotate}
              top={values.top}
              transition={isDragging === false}
              width={values.width}
            ></Image>
            {selectedTab === "edit" && (
              <>
                <EditButton onClick={expandHandler} left="16px">
                  <ExpandSprite>Expand</ExpandSprite>
                </EditButton>
                <EditButton onClick={rotateHandler} right="16px">
                  <RotateSprite>Rotate</RotateSprite>
                </EditButton>
                {!isExpanded && <Grid />}
              </>
            )}
          </ImageContainer>
        </Padding>
      </Container>
    </div>
  );
};
