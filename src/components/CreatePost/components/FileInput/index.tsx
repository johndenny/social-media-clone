import React, { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as CreatePostSvg } from "../../../../assets/svgs/createPost.svg";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../context/CreatePostContext";
import useImageUpload from "../../../../hooks/useImageUpload";
import { HiddenFileInput } from "../../../HiddenFileInput";
import { PaddedButton } from "../../../PaddedButton";
import { Container, Title } from "./styled";

interface Props {}

export const FileInput: React.FC<Props> = () => {
  const { photosToUploadDispatch, photosToUploadState, postToEdit } =
    useContext(CreatePostContext) as CreatePostContextType;
  const inputRef = useRef<HTMLInputElement>(null);
  const { fileChangeHandler, setSelectedFiles, setType } = useImageUpload();
  const [isDragging, setIsDragging] = useState(false);
  const dragLocation = useRef<EventTarget | null>(null);

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer) return;

    setType("photo-post");
    setSelectedFiles(
      Array.from(e.dataTransfer.files).map((file) => {
        return file;
      })
    );

    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragEnterHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragLocation.current = e.target;
    setIsDragging(true);
  };

  const dragLeaveHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === dragLocation.current) setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", dropHandler);
    window.addEventListener("dragenter", dragEnterHandler);
    window.addEventListener("dragleave", dragLeaveHandler);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", dropHandler);
      window.removeEventListener("dragenter", dragEnterHandler);
      window.removeEventListener("dragleave", dragLeaveHandler);
    };
  }, []);

  useEffect(() => {
    if (photosToUploadState.length !== 0 && !postToEdit)
      photosToUploadDispatch({ type: "clear" });
  }, []);

  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <CreatePostSvg fill={isDragging ? "#0095f6" : "#262626"} />
      <Title>Drag Photos Here</Title>
      <PaddedButton onClick={() => inputRef.current?.click()}>
        Select from computer
      </PaddedButton>
      <HiddenFileInput
        fileChangeHandler={fileChangeHandler}
        inputRef={inputRef}
        name={"photo-post"}
        multiple={true}
      />
    </Container>
  );
};
