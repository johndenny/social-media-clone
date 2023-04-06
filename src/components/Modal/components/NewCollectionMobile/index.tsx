import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Img } from "../../../../styled";
import { cld } from "../../../../utils/cloudinaryConfig";
import {
  Container,
  HiddenSpan,
  Input,
  InputContainer,
  Thumbnail,
} from "./styled";
import { Input as InputWide } from "../../../../routes/Profile/Saved/NewCollection/styled";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../context/GlobalContext";

interface Props {
  photoId: string;
  newCollectionName: string;
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NewCollectionMobile: React.FC<Props> = ({
  photoId,
  inputChangeHandler,
  newCollectionName,
}) => {
  const { isMobile } = useGlobalContext() as globalContextType;
  const [inputWidth, setInputWidth] = useState(8);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const buffer =
    newCollectionName === "" || /\s$/.test(newCollectionName) ? 8 : 0;

  const firstPhoto = cld
    .image(photoId)
    .resize(thumbnail().width(90).height(90));

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useLayoutEffect(() => {
    if (spanRef.current) setInputWidth(spanRef.current.clientWidth + buffer);
  }, [newCollectionName]);

  return (
    <Container>
      <label htmlFor="collection-name">
        <HiddenSpan>Collection name</HiddenSpan>
        <Thumbnail>
          <Img alt="" src={firstPhoto.toURL()} />
        </Thumbnail>
      </label>
      {isMobile ? (
        <InputContainer>
          <Input
            id="collection-name"
            ref={inputRef}
            style={{ width: `${inputWidth}px` }}
            type="text"
            onChange={inputChangeHandler}
            value={newCollectionName}
            autoComplete="off"
          />
        </InputContainer>
      ) : (
        <InputWide
          id="collection-name"
          placeholder="Collection name"
          ref={inputRef}
          type="text"
          onChange={inputChangeHandler}
          value={newCollectionName}
          autoComplete="off"
        />
      )}

      <HiddenSpan ref={spanRef}>{newCollectionName}</HiddenSpan>
    </Container>
  );
};
