import React, { ChangeEvent, useContext, useState } from "react";
import { globalContextType } from "../../../../../context/GlobalContext";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { useTextInputSearch } from "../../../../../hooks/useTextInputSearch";
import { EmojiModal } from "../../../../EmojiModal";
import { ProfileListTextInput } from "../../../../ProfileListTextInput";
import { ProfilePhoto } from "../../../../ProfilePhoto";
import { TagListTextInput } from "../../../../TagListTextInput";
import { Section } from "../../Filter/SideMenu/styled";
import {
  Header,
  Paragraph,
  PostOptionButton,
  PostOptionContainer,
  TextArea,
  TextAreaOptions,
  ToggleContainer,
  Username,
} from "./styled";
import { ReactComponent as ChevronDownSvg } from "../../../../../assets/svgs/chevronDown.svg";
import { ToggleInput } from "../../../../ToggleInput";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../context/CreatePostContext";
import { LocationSearch } from "../LocationSearch";

type DropDownI = "advanced" | "";

interface Props {}

export const SideMenu: React.FC<Props> = () => {
  const { viewer } = useGlobalContext() as globalContextType;
  const { username } = viewer.data?.viewer;

  const { isCommentsOff, setIsCommentsOff, text, setText } = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const [selectedDropDown, setSelectedDropDown] = useState<DropDownI>("");

  const {
    textAreaRef,
    isFocused,
    setIsFocused,
    textChangeHandler,
    insertSearch,
    searchListUser,
    searchListTag,
  } = useTextInputSearch(text, setText);

  const textLimitHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (
      (text.slice(-1) === " " && e.currentTarget.value.slice(-1) === " ") ||
      text.length === 2200
    )
      return;

    textChangeHandler(e);
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.relatedTarget?.id === "searchItem") return;
    setIsFocused(false);
  };

  return (
    <Section>
      <Header>
        <ProfilePhoto
          height={"28px"}
          isWithoutLink={true}
          {...viewer.data?.viewer}
        />
        <Username>{username}</Username>
      </Header>
      <div>
        <TextArea
          ref={textAreaRef}
          aria-label="Write a caption..."
          placeholder="Write a caption..."
          autoComplete="off"
          autoCorrect="off"
          onFocus={() => setIsFocused(true)}
          onBlur={onBlurHandler}
          onChange={textLimitHandler}
          value={text}
        ></TextArea>
        <TextAreaOptions>
          <EmojiModal setText={setText} isCreatePost={true} />
          <span>{`${text.length}/2,200`}</span>
        </TextAreaOptions>
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
      <LocationSearch />
      <PostOptionButton
        onClick={() =>
          setSelectedDropDown((prevState) =>
            prevState === "" ? "advanced" : ""
          )
        }
        isSelected={selectedDropDown === "advanced"}
      >
        Advanced settings
        <span
          style={
            selectedDropDown === "advanced"
              ? { transform: "rotate(180deg)" }
              : undefined
          }
        >
          <ChevronDownSvg height={14} width={14} />
        </span>
      </PostOptionButton>
      {selectedDropDown === "advanced" && (
        <PostOptionContainer>
          <ToggleContainer>
            <h3>Turn off commenting</h3>
            <ToggleInput
              id="commenting"
              checked={isCommentsOff}
              setChecked={setIsCommentsOff}
            />
          </ToggleContainer>
          <Paragraph>
            You can change this later by going to the ··· menu at the top of
            your post.
          </Paragraph>
        </PostOptionContainer>
      )}
    </Section>
  );
};
