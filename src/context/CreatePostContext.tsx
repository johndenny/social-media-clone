import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useMutation, UseMutationState } from "urql";
import { PostValues } from "../components/PostItem";
import { EditPost, UploadPost } from "../graphQL/mutations";
import useGlobalContext from "../hooks/useGlobalContext";
import { Filters } from "../hooks/useMobilePhotoCanvas";
import { CanvasResultI } from "../hooks/usePhotoCanvas";
import { PostLocationI, TagType } from "../routes/Create";
import { cld } from "../utils/cloudinaryConfig";
import { globalContextType } from "./GlobalContext";

export type AspectRatioType = "original" | "1:1" | "4:5" | "16:9";

export type CreatePostContextType = {
  fileOverflow: number;
  setFileOverflow: React.Dispatch<React.SetStateAction<number>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedAspectRatio: AspectRatioType;
  setSelectedAspectRatio: React.Dispatch<React.SetStateAction<AspectRatioType>>;
  resetValues: FilterValuesI;
  setResetValues: React.Dispatch<React.SetStateAction<FilterValuesI>>;
  currentPage: CurrentPageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPageType>>;
  tagSearchLocation: TagSearchLocationI | null;
  setTagSearchLocation: React.Dispatch<
    React.SetStateAction<TagSearchLocationI | null>
  >;
  photosToUploadState: PhotoToUploadI[];
  photosToUploadDispatch: React.Dispatch<PhotosToUploadActionT>;
  instructionConsumed: InstructionComsumedI;
  setInstructionConsumed: React.Dispatch<
    React.SetStateAction<InstructionComsumedI>
  >;
  isCommentsOff: boolean;
  setIsCommentsOff: React.Dispatch<React.SetStateAction<boolean>>;
  postUploadHandler: () => void;
  uploadPostResult: UseMutationState<any, object>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  postLocation: PostLocationI | null;
  setPostLocation: React.Dispatch<React.SetStateAction<PostLocationI | null>>;
  setPostToEdit: React.Dispatch<React.SetStateAction<PostValues | null>>;
  postToEdit: PostValues | null;
  postEditHandler: () => void;
  editPostResult: UseMutationState<any, object>;
};

interface InstructionComsumedI {
  gallery: boolean;
  tags: boolean;
}

type CurrentPageType = "details" | "crop" | "edit" | "sharing";

interface TagSearchLocationI {
  xPercent: number;
  yPercent: number;
  clientX: number;
  clientY: number;
}

export interface FilterValuesI {
  temperature: number;
  saturation: number;
  contrast: number;
  brightness: number;
  filter: Filters;
}

export interface PhotoToUploadI {
  base64: string;
  url: string;
  tags: TagType[];
}

export interface PhotoToEditI {
  url: string;
  tags: TagType[];
}

const intitPhotosToUploadState = [] as PhotoToUploadI[];

type PhotosToUploadActionT =
  | ActionLoadAllI
  | ActionEditSelected
  | ActionClearI
  | ActionToggleTagI
  | ActionLoadEditI;

interface ActionLoadAllI {
  type: "load-all";
  payload: CanvasResultI[];
}

interface ActionEditSelected {
  type: "edit-selected";
  payload: { base64: string; url: string; selectedIndex: number };
}

interface ActionClearI {
  type: "clear";
}

interface ActionToggleTagI {
  type: "add-tag" | "remove-tag";
  payload: { tag: TagType; selectedIndex: number };
}

interface ActionLoadEditI {
  type: "load-edit";
  payload: PhotoToEditI[];
}

function photosToUploadReducer(
  state: PhotoToUploadI[],
  action: PhotosToUploadActionT
): PhotoToUploadI[] {
  const { type } = action;
  const newArray = [...state];
  switch (type) {
    case "load-all":
      return action.payload.map((photo, index) => {
        const tags = state[index]?.tags;
        return { ...photo, tags: tags || [] };
      });

    case "load-edit":
      return action.payload.map((photo: PhotoToEditI): PhotoToUploadI => {
        return { url: photo.url, base64: "", tags: photo.tags };
      });

    case "edit-selected":
      newArray.splice(action.payload.selectedIndex, 1);
      newArray.splice(action.payload.selectedIndex, 0, {
        ...state[action.payload.selectedIndex],
        base64: action.payload.base64,
        url: action.payload.url,
      });
      return newArray;

    case "add-tag":
      let oldTags = [...state[action.payload.selectedIndex].tags];
      const tagIndex = oldTags.findIndex(
        (oldTag) => oldTag.username === action.payload.tag.username
      );
      if (tagIndex !== -1) {
        oldTags.splice(tagIndex, 1);
      }
      const newTags = [action.payload.tag, ...oldTags];

      newArray.splice(action.payload.selectedIndex, 1);
      newArray.splice(action.payload.selectedIndex, 0, {
        ...state[action.payload.selectedIndex],
        tags: newTags,
      });
      return newArray;

    case "remove-tag":
      const tags = [...state[action.payload.selectedIndex].tags];
      const removeTagIndex = tags.findIndex(
        (removeTag) => removeTag.username === action.payload.tag.username
      );
      if (removeTagIndex === -1) return state;

      tags.splice(removeTagIndex, 1);

      newArray.splice(action.payload.selectedIndex, 1);
      newArray.splice(action.payload.selectedIndex, 0, {
        ...state[action.payload.selectedIndex],
        tags,
      });

      return newArray;

    case "clear":
      return intitPhotosToUploadState;
    default:
      return intitPhotosToUploadState;
  }
}

type CreatePostDataProviderType = {
  children: React.ReactNode;
};

export const CreatePostContext = createContext<CreatePostContextType | null>(
  null
);

export const CreatePostDataProvider = ({
  children,
}: CreatePostDataProviderType) => {
  const {
    setFooterMessage,
    setFollowingPostsDate,
    queryVarsDispatch,
    setIsCreatePostOpen,
  } = useGlobalContext() as globalContextType;
  const [photosToUploadState, photosToUploadDispatch] = useReducer(
    photosToUploadReducer,
    intitPhotosToUploadState
  );
  const [fileOverflow, setFileOverflow] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAspectRatio, setSelectedAspectRatio] =
    useState<AspectRatioType>("1:1");
  const [resetValues, setResetValues] = useState<FilterValuesI>({
    temperature: 100,
    saturation: 0,
    contrast: 0,
    brightness: 0,
    filter: "normal" as Filters,
  });
  const [currentPage, setCurrentPage] = useState<CurrentPageType>("crop");
  const [tagSearchLocation, setTagSearchLocation] =
    useState<TagSearchLocationI | null>(null);
  const [instructionConsumed, setInstructionConsumed] =
    useState<InstructionComsumedI>({ gallery: false, tags: false });
  const [isCommentsOff, setIsCommentsOff] = useState(false);
  const [text, setText] = useState("");
  const [postLocation, setPostLocation] = useState<PostLocationI | null>(null);
  const [postToEdit, setPostToEdit] = useState<PostValues | null>(null);

  const [uploadPostResult, uploadPostMutation] = useMutation(UploadPost);
  const [editPostResult, editPostMutation] = useMutation(EditPost);

  const postUploadHandler = () => {
    setCurrentPage("sharing");

    let location;
    if (postLocation) {
      const { address, ...locationVars } = postLocation;
      location = locationVars;
    }

    let variables = {
      photoData: photosToUploadState.map((photo) => {
        return {
          photoString: photo.base64,
          tags: photo.tags,
        };
      }),
      text,
      location,
    };

    uploadPostMutation(variables).then((result) => {
      queryVarsDispatch({ type: "reset" });
      if (result.error) {
        console.error(new Error("Error uploading post."));
        setCurrentPage("details");
      }

      setFollowingPostsDate(new Date().toISOString());
    });
  };

  const postEditHandler = () => {
    if (!postToEdit) return console.error("Post not found.");
    const photos = postToEdit.photos.map((photo, index) => {
      return { photoId: photo.id, tags: photosToUploadState[index].tags };
    });
    let location;
    if (postLocation) {
      const { address, ...locationVars } = postLocation;
      location = locationVars;
    }
    const variables = {
      postId: postToEdit.id,
      photos,
      text,
      location,
    };

    editPostMutation(variables).then((result) => {
      if (result.error) setFooterMessage("Error editing post.");
      if (result.data) setFooterMessage("Post edited successfully.");
      setIsCreatePostOpen(false);
    });
  };

  useEffect(() => {
    if (!postToEdit) return;

    setIsCreatePostOpen(true);
    const photos = postToEdit.photos.map((photo) => {
      const tags = photo.tags.map((tag) => {
        return {
          x: tag.x,
          y: tag.y,
          username: tag.User.username,
          userId: tag.User.id,
        };
      });
      const url = cld.image(photo.id).toURL();
      return { url, tags };
    });

    photosToUploadDispatch({ type: "load-edit", payload: photos });
    setPostLocation(postToEdit.location);
    setText(postToEdit.text);
    setCurrentPage("details");
  }, [postToEdit]);

  return (
    <CreatePostContext.Provider
      value={{
        editPostResult,
        postEditHandler,
        postToEdit,
        setPostToEdit,
        postLocation,
        setPostLocation,
        text,
        setText,
        uploadPostResult,
        postUploadHandler,
        isCommentsOff,
        setIsCommentsOff,
        setInstructionConsumed,
        instructionConsumed,
        photosToUploadDispatch,
        photosToUploadState,
        setTagSearchLocation,
        tagSearchLocation,
        currentPage,
        setCurrentPage,
        resetValues,
        setResetValues,
        selectedAspectRatio,
        setSelectedAspectRatio,
        fileOverflow,
        setFileOverflow,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};

export const useCreateContextWide = () => useContext(CreatePostContext);
