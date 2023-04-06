import React, { useContext, useEffect, useState } from "react";
import { FileDragStateI } from "..";
import {
  globalContextType,
  IUrlFile,
} from "../../../../../../context/GlobalContext";
import useGlobalContext from "../../../../../../hooks/useGlobalContext";
import {
  OuterPhotoContainer,
  PhotoButton,
  PhotoContainer,
  RemoveButton,
} from "./styled";
import { ReactComponent as CloseSvg } from "../../../../../../assets/svgs/close.svg";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../../context/CreatePostContext";

interface Props {
  fileDragState: FileDragStateI;
  file: IUrlFile;
  index: number;
  startDraggingHandler: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => void;
  fileClickHandler: (index: number) => void;
}

export const PhotoFile = React.memo(function PhotoFile({
  fileDragState,
  file,
  index,
  startDraggingHandler,
  fileClickHandler,
}: Props) {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  const { selectedIndex } = useContext(
    CreatePostContext
  ) as CreatePostContextType;
  const { draggingIndex, dragMovementX, filesPassedOver } = fileDragState;
  const aspectRatio = file.width / file.height;
  const height = aspectRatio >= 1 ? 94 : 94 / aspectRatio;
  const width = aspectRatio >= 1 ? 94 * aspectRatio : 94;

  const isSelected = index === selectedIndex;
  const isDragging = index === draggingIndex;
  let isFilePassedOver;

  // has file been passed over from left or the right
  if (filesPassedOver !== undefined && draggingIndex !== undefined) {
    const isFilePassedFromTop =
      filesPassedOver + draggingIndex >= index && index > draggingIndex;

    const isFilePassedFromBottom =
      filesPassedOver + draggingIndex <= index && index < draggingIndex;

    isFilePassedOver =
      filesPassedOver > 0 ? isFilePassedFromTop : isFilePassedFromBottom;
  }

  // moves when passed over from left or right OR moves when dragged OR static position
  const translateX =
    isFilePassedOver && !isDragging
      ? (filesPassedOver > 0 ? index - 1 : index + 1) * 106
      : isDragging && dragMovementX
      ? index * 106 + dragMovementX
      : index * 106;

  return (
    <OuterPhotoContainer
      style={{
        transform: `translate3d(${translateX}px , 0px, 0px)`,
        zIndex: isDragging ? "1" : "0",
        transition: isDragging ? undefined : "transform .3s ease-in-out",
      }}
    >
      {isSelected && !isDragging && (
        <RemoveButton
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            setModalAttrs({ type: "discard-photo" });
          }}
        >
          <CloseSvg height={12} width={12} stroke="#ffffff" />
        </RemoveButton>
      )}

      <PhotoButton
        onMouseDown={(e) => startDraggingHandler(e, index)}
        onClick={() => fileClickHandler(index)}
      >
        <PhotoContainer
          style={{
            transform: `scale(${isDragging ? 1.2 : 1})`,
          }}
        >
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, ${
                isSelected && !isDragging ? "0" : "0.5"
              }), rgba(0, 0, 0, ${
                isSelected && !isDragging ? "0" : "0.5"
              })), url(${file.url})`,
              height: `${height}px`,
              width: `${width}px`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              opacity: isDragging ? 0.85 : undefined,
            }}
          ></div>
        </PhotoContainer>
      </PhotoButton>
    </OuterPhotoContainer>
  );
});
