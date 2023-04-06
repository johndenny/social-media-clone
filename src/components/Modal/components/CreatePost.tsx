import React from "react";
import {
  CreatePostContextType,
  useCreateContextWide,
} from "../../../context/CreatePostContext";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { BackDrop } from "../styled";

interface Props {}

export const CreatePost: React.FC<Props> = () => {
  const { setModalAttrs, urlFiles, setIsCreatePostOpen } =
    useGlobalContext() as globalContextType;
  const { currentPage } = useCreateContextWide() as CreatePostContextType;

  return (
    <BackDrop
      onClick={() =>
        urlFiles.length === 0 || currentPage === "sharing"
          ? setIsCreatePostOpen(false)
          : setModalAttrs({ type: "leave-create-post" })
      }
      isSecondary
    >
      <CreatePost />
    </BackDrop>
  );
};
