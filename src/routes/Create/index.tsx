import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useMutation } from "urql";
import { globalContextType } from "../../context/GlobalContext";
import { UploadPost } from "../../graphQL/mutations";
import useGlobalContext from "../../hooks/useGlobalContext";
import {
  Filters,
  useMobilePhotoCanvas,
} from "../../hooks/useMobilePhotoCanvas";
import {
  ImageValues,
  useMobilePhotoMovement,
} from "../../hooks/useMobilePhotoMovement";

type TagState = {
  savedTags: TagType[];
  pendingTags: TagType[];
};

export type TagAction = {
  type: "cancel" | "add" | "save" | "delete";
  payload?: TagType;
};

const intialTagState = { savedTags: [], pendingTags: [] };

function tagReducer(state: TagState, action: TagAction) {
  const { type, payload } = action;
  switch (type) {
    case "delete":
      const filterDelete = state.pendingTags.filter(
        (tag) => tag.username !== payload?.username
      );
      return { ...state, pendingTags: [...filterDelete] };
    case "add":
      if (!payload) return state;
      //filters out tag if username is the same
      const filterAdd = state.pendingTags.filter(
        (tag) => tag.username !== payload?.username
      );
      const roundedPayload = {
        ...payload,
        x: Math.round(payload.x),
        y: Math.round(payload.y),
      };
      return { ...state, pendingTags: [...filterAdd, roundedPayload] };
    case "save":
      return { ...state, savedTags: [...state.pendingTags] };
    case "cancel":
      return { ...state, pendingTags: [...state.savedTags] };
  }
}

export interface PostLocationI {
  id: number;
  lat: string;
  lon: string;
  name: string;
  address: string;
}

export type TagLocationType = {
  x: number;
  y: number;
};

type ListType = {
  start: number;
  length: number;
};

export type TagType = {
  x: number;
  y: number;
  username: string;
  userId: string;
};

type CreateContext = {
  selectedTab: "edit" | "filter";
  setSelectedTab: Dispatch<SetStateAction<"edit" | "filter">>;
  values: ImageValues;
  isDragging: boolean | null;
  rotateHandler: () => void;
  expandHandler: () => void;
  isExpanded: boolean;
  selectedFilter: Filters;
  setSelectedFilter: Dispatch<SetStateAction<Filters>>;
  canvasRef: RefObject<HTMLCanvasElement>;
  scrollLeft: number;
  setScrollLeft: Dispatch<SetStateAction<number>>;
  listOptions: ListType;
  setListOptions: Dispatch<SetStateAction<ListType>>;
  tagState: TagState;
  tagDispatch: Dispatch<TagAction>;
  textInput: string;
  setTextInput: Dispatch<SetStateAction<string>>;
  postUploadHandler: () => void;
  photoRef: React.RefObject<HTMLDivElement>;
  tagLocation: TagLocationType;
  setTagLocation: Dispatch<SetStateAction<TagLocationType | null>>;
  setPostLocation: React.Dispatch<React.SetStateAction<PostLocationI | null>>;
  postLocation: PostLocationI | null;
  loadImageWithFetch: () => Promise<void>;
  isFetching: boolean;
};

export const Create: React.FC = () => {
  const {
    urlFiles,
    setUrlFiles,
    imageToUpload,
    setFooterMessage,
    queryVarsDispatch,
    setHeaderAttrs,
    setFollowingPostsDate,
  } = useGlobalContext() as globalContextType;
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"edit" | "filter">("edit");
  const {
    photoRef,
    values,
    isDragging,
    rotateHandler,
    expandHandler,
    isExpanded,
  } = useMobilePhotoMovement(
    urlFiles[0].width,
    urlFiles[0].height,
    selectedTab
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFilter, setSelectedFilter, loadImageWithFetch, isFetching] =
    useMobilePhotoCanvas(urlFiles[0], canvasRef, values);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [listOptions, setListOptions] = useState({ start: 0, length: 0 });
  const [tagState, tagDispatch] = useReducer(tagReducer, intialTagState);
  const [textInput, setTextInput] = useState("");
  const [tagLocation, setTagLocation] = useState<TagLocationType | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [postLocation, setPostLocation] = useState<PostLocationI | null>(null);

  const [uploadPostResult, uploadPostMutation] = useMutation(UploadPost);
  const postUploadHandler = () => {
    setHeaderAttrs({ title: "Sharing" });
    queryVarsDispatch({ type: "preload" });

    let variables = {
      photoData: {
        photoString: imageToUpload?.base64,
        tags: tagState.savedTags,
      },
      text: textInput,
      location: {},
    };

    if (postLocation) {
      const { address, ...location } = postLocation;
      variables = { ...variables, location };
    }
    uploadPostMutation(variables).then((result) => {
      queryVarsDispatch({ type: "reset" });
      if (result.error) {
        setFooterMessage(result.error.graphQLErrors[0].message);
      }
      if (result.data) {
        setFooterMessage("Your post has been uploaded.");
      }
      setFollowingPostsDate(new Date().toISOString());
      navigate("/");
    });
  };

  useEffect(() => {
    if (isFirstLoad) setIsFirstLoad(false);
    return () => {
      if (!isFirstLoad) setUrlFiles([]);
    };
  }, [isFirstLoad]);

  return (
    <Outlet
      context={{
        loadImageWithFetch,
        isFetching,
        postLocation,
        setPostLocation,
        tagLocation,
        setTagLocation,
        photoRef,
        listOptions,
        setListOptions,
        scrollLeft,
        setScrollLeft,
        selectedTab,
        setSelectedTab,
        values,
        isDragging,
        rotateHandler,
        expandHandler,
        isExpanded,
        selectedFilter,
        setSelectedFilter,
        canvasRef,
        tagState,
        tagDispatch,
        textInput,
        setTextInput,
        postUploadHandler,
      }}
    />
  );
};

export function useCreateContext() {
  return useOutletContext<CreateContext>();
}
