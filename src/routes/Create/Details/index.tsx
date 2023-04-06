import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateContext } from "..";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../components/HeaderMobile";
import { ClearSprite } from "../../../components/Navigation/components/NavigationSearch/styled";
import { ProfileListTextInput } from "../../../components/ProfileListTextInput";
import { ProfilePhoto } from "../../../components/ProfilePhoto";
import { ClearIcon } from "../../../components/SearchMobile/styled";
import { TagListTextInput } from "../../../components/TagListTextInput";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useTextInputSearch } from "../../../hooks/useTextInputSearch";
import { Img } from "../../../styled";
import { Span } from "../Location/styled";
import {
  BackDrop,
  Button,
  Container,
  ImageContainer,
  LocationContainer,
  RightIcon,
  TagContainer,
  TextArea,
  TextInputSection,
} from "./styled";

export const Details: React.FC = () => {
  const navigate = useNavigate();
  const { setHeaderAttrs, viewer, imageToUpload, setIsFooterNavHidden } =
    useGlobalContext() as globalContextType;
  const {
    tagState,
    setTextInput,
    textInput,
    postUploadHandler,
    setPostLocation,
    postLocation,
    values,
  } = useCreateContext();
  const { savedTags } = tagState;
  const {
    textAreaRef,
    isFocused,
    setIsFocused,
    textChangeHandler,
    insertSearch,
    searchListUser,
    searchListTag,
  } = useTextInputSearch(textInput, setTextInput);

  useEffect(() => {
    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "New post",
      rightButton: RightHeaderButton.share,
      rightOnClick: postUploadHandler,
    });
    setIsFooterNavHidden(true);
    return () => {
      setIsFooterNavHidden(false);
    };
  }, [textInput]);

  return (
    <Container>
      <div>
        <TextInputSection>
          <ProfilePhoto
            height="30px"
            id={viewer?.data?.viewer?.id}
            photoVersion={viewer?.data?.viewer?.photoVersion}
            username={viewer?.data?.viewer?.username}
            isWithoutLink={true}
          />
          <TextArea
            autoComplete="off"
            autoCorrect="off"
            ref={textAreaRef}
            onChange={textChangeHandler}
            value={textInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></TextArea>
          <ImageContainer>
            <Img alt="Preview to be uploaded" src={imageToUpload?.url} />
          </ImageContainer>
        </TextInputSection>
        {searchListUser && (
          <ProfileListTextInput
            position="bottom"
            getUsername={insertSearch}
            profiles={searchListUser}
          />
        )}
        {searchListTag && (
          <TagListTextInput
            position="bottom"
            insertSearch={insertSearch}
            tags={searchListTag}
          />
        )}
      </div>
      <Button
        onClick={() => navigate("/create/location/")}
        isPostLocation={Boolean(postLocation)}
      >
        {postLocation ? (
          <>
            <LocationContainer>
              <Span style={{ lineHeight: "18px" }}>{postLocation.name}</Span>
              {postLocation.address && (
                <Span
                  style={{
                    fontSize: "14px",
                    color: "rgb(var(--secondary-text))",
                  }}
                >
                  {postLocation.address}
                </Span>
              )}
            </LocationContainer>
            <div
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                setPostLocation(null);
              }}
            >
              <ClearIcon></ClearIcon>
            </div>
          </>
        ) : (
          <>
            Add Location<RightIcon></RightIcon>
          </>
        )}
      </Button>
      <Button onClick={() => navigate("/create/tag")}>
        <span>Tag people</span>
        <TagContainer>
          {savedTags.length === 1 && <span>{savedTags[0].username}</span>}
          {savedTags.length > 1 && <span>{`${savedTags.length} people`}</span>}
          <RightIcon></RightIcon>
        </TagContainer>
      </Button>

      {isFocused && <BackDrop></BackDrop>}
    </Container>
  );
};
