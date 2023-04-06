import React from "react";
import { Hidden } from "./styled/Hidden";

interface Props {
  fileChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  name: "profile-photo" | "photo-post";
  multiple?: boolean;
}

export const HiddenFileInput: React.FC<Props> = ({
  fileChangeHandler,
  inputRef,
  name,
  multiple,
}) => {
  return (
    <Hidden>
      <form>
        <input
          onClick={(e) => e.stopPropagation()}
          onChange={fileChangeHandler}
          ref={inputRef}
          multiple={multiple ? true : false}
          accept="image/jpeg,image/png"
          type="file"
          name={name}
        />
      </form>
    </Hidden>
  );
};
