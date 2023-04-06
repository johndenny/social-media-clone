import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useLayoutEffect,
  useReducer,
  useRef,
} from "react";
import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  OperationContext,
  useMutation,
  UseMutationState,
  useQuery,
  UseQueryState,
  useSubscription,
  UseSubscriptionState,
} from "urql";
import { HeaderProps } from "../components/HeaderMobile";
import { ModalType } from "../components/Modal";
import {
  AddCollectionPosts,
  AddHashTagSearch,
  AddUserSearch,
  DeleteCollectionPosts,
  DeletePost,
  LogOut,
  RemoveProfilePhoto,
  UnsavePost,
  UploadProfilePhoto,
} from "../graphQL/mutations";
import {
  CommentLikes,
  Comments,
  ExplorePosts,
  Followers,
  Following,
  FollowingPosts,
  HashTag,
  Me,
  PostLikes,
  ReplyLikes,
  SuggestedUsers,
  UniqueChat,
  UniqueCollection,
  UniqueComment,
  UniqueLocation,
  UniquePost,
  UniqueUser,
  ViewerActivty,
  ViewerChats,
  ViewerCollections,
  ViewerFollowRequests,
  ViewerRequestChats,
} from "../graphQL/queries";
import { SavedPosts } from "../graphQL/queries/SavedPosts";
import { DeletedMessage } from "../graphQL/subsriptions/DeletedMessage";
import { NewActivity } from "../graphQL/subsriptions/NewActivity";
import { NewPosts } from "../graphQL/subsriptions/NewPosts";
import { ReadMessage } from "../graphQL/subsriptions/ReadMessage";
import { UnreadMessageCount } from "../graphQL/subsriptions/UnreadMessageCount";
import {
  InitialStateType,
  ScrollActionType,
  useInfinitePagination,
} from "../hooks/useInfinitePagination";
import { PhotoMovementValuesType } from "../hooks/usePhotoMovement";
import { useProfilePhotoCanvas } from "../hooks/useProfilePhotoCanvas";
import { CollectionI } from "../routes/Profile/Saved/components/CollectionItem";
import { setAccessToken } from "../utils/accessToken";
import { ClientStateI, useClient } from "./ClientContext";

const GlobalContext = createContext<globalContextType | null>(null);

export type ProfileModalType = {
  username: string;
  top: number;
  left: number;
  position: string;
};

type DataContextProviderProps = {
  children: React.ReactNode;
};

export interface IUrlFile {
  width: number;
  height: number;
  url: string;
  type: string;
  values: PhotoMovementValuesType;
}

export interface ImageToUploadI {
  base64: string;
  url: string;
}

export interface SavedPostMutationDetailsI {
  postId: string;
  collection?: CollectionI;
  isDelete?: boolean;
}

export type globalContextType = {
  isMobile: boolean | null;
  viewer: UseQueryState<any, object>;
  user: UseQueryState<any, string>;
  reexecuteViewerQuery: (opts?: Partial<OperationContext> | undefined) => void;
  footerMessage: string;
  setFooterMessage: Dispatch<SetStateAction<string>>;
  /**
   * If title is null component returns null.
   */
  setHeaderAttrs: Dispatch<SetStateAction<HeaderProps>>;
  headerAttrs: HeaderProps;
  setModalAttrs: Dispatch<SetStateAction<ModalType | null>>;
  modalAttrs: ModalType | null;
  setUrlFiles: Dispatch<SetStateAction<IUrlFile[]>>;
  urlFiles: IUrlFile[];
  setIsFooterNavHidden: Dispatch<SetStateAction<boolean>>;
  isFooterNavHidden: boolean;
  setImageToUpload: Dispatch<SetStateAction<ImageToUploadI | null>>;
  imageToUpload: ImageToUploadI | null;
  uploadProfilePhotoResult: UseMutationState<any, object>;
  removeProfilePhotoResult: UseMutationState<any, object>;
  uploadProfilePhotoHandler: () => void;
  removeProfilePhotoHandler: () => void;
  unfollowButtonRef: RefObject<HTMLButtonElement | undefined>;
  resultFollowing: UseQueryState<any, string>;
  resultFollowers: UseQueryState<any, string>;
  resultPost: UseQueryState<any, string>;
  resultHashTag: UseQueryState<any, { name: string }>;
  resultPostLikes: UseQueryState<any, string>;
  resultComments: UseQueryState<any, string>;
  resultCommentLikes: UseQueryState<any, string>;
  resultUniqueComment: UseQueryState<any, string>;
  resultSuggestedUsers: UseQueryState<any, string>;
  resultExplorePosts: UseQueryState<any, string>;
  resultFollowingPosts: UseQueryState<any, string>;
  resultUniqueChat: UseQueryState<any, string>;
  resultViewerChats: UseQueryState<any, string>;
  resultActivity: UseQueryState<any, string>;
  resultUserModal: UseQueryState<any, string>;
  resultLocation: UseQueryState<any, string>;
  resultRequestChats: UseQueryState<any, string>;
  resultUniqueCollection: UseQueryState<any, string>;
  resultCollections: UseQueryState<any, string>;
  queryVarsState: QueryVarsType;
  queryVarsDispatch: Dispatch<QueryVarsAction>;
  addRecentUserSearch: (userId: string) => void;
  addRecentHashTagSearch: (hashTagName: string) => void;
  setScrollY: React.Dispatch<React.SetStateAction<number | undefined>>;
  scrollY: number | undefined;
  followingPostsDate: string;
  setFollowingPostsDate: React.Dispatch<React.SetStateAction<string>>;
  resultNewPosts: UseSubscriptionState<any, object>;
  setIsNewPosts: React.Dispatch<React.SetStateAction<boolean>>;
  isNewPosts: boolean;
  replyVars: {
    username: string;
    commentId: string;
  } | null;
  setReplyVars: React.Dispatch<
    SetStateAction<{
      username: string;
      commentId: string;
    } | null>
  >;
  setNewReplyCommentId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  newReplyCommentId: string | undefined;
  resultReplyLikes: UseQueryState<any, string>;
  resultSavedPosts: UseQueryState<any, string>;
  resultFollowRequests: UseQueryState<any, string>;
  profileModalAttrs: ProfileModalType | null;
  setProfileModalAttrs: React.Dispatch<SetStateAction<ProfileModalType | null>>;
  profileModalTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
  isModal: boolean;
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  openMessageMenuId: string;
  setOpenMessageMenuId: React.Dispatch<React.SetStateAction<string>>;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSuggestedUsersPopular: boolean;
  activityDate: string;
  messagesDate: string;
  deletePostHandler: (postId: string) => void;
  setSavedPostMutationDetails: React.Dispatch<
    React.SetStateAction<SavedPostMutationDetailsI | null>
  >;
  savedPostMutationDetails: SavedPostMutationDetailsI | null;
  saveToCollectionHandler: (postId: string, collection: CollectionI) => void;
  removeCollectionPostHandler: (
    postId: string,
    collection: CollectionI
  ) => void;
  unsavePostHandler: (postId: string) => void;
  followingPostsInfinitePagination: {
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
    viewportRef: React.MutableRefObject<HTMLDivElement | null>;
    scrollDispatch: React.Dispatch<ScrollActionType>;
    scrollState: InitialStateType;
    morePosts: () => void;
  };
  logOut: () => Promise<void>;
};

type QueryVarsType = {
  user: string;
  userFeed: string;
  savedPosts: string;
  taggedPosts: string;
  post: string;
  hashTag: { name: string };
  postLikes: string;
  followers: string;
  following: string;
  comments: string;
  commentLikes: string;
  uniqueComment: string;
  uniqueChat: string;
  suggestedUsers: string;
  explorePosts: string;
  followingPosts: string;
  viewerChats: string;
  activity: string;
  isPreload: boolean;
  replyLikes: string;
  followRequests: string;
  userModal: string;
  location: string;
  viewerRequestChats: string;
  uniqueCollection: string;
  collections: string;
};

export enum PreloadQuery {
  user = "user",
  userFeed = "userFeed",
  savedPosts = "savedPosts",
  taggedPosts = "taggedPosts",
  explorePosts = "explorePosts",
  post = "post",
  hashTag = "hashTag",
  postLikes = "postLikes",
  followers = "followers",
  following = "following",
  comments = "comments",
  commentLikes = "commentLikes",
  uniqueComment = "uniqueComment",
  suggestedUsers = "suggestedUsers",
  followingPosts = "followingPosts",
  uniqueChat = "uniqueChat",
  viewerChats = "viewerChats",
  activity = "activity",
  replyLikes = "replyLikes",
  followRequests = "followRequests",
  userModal = "userModal",
  location = "location",
  viewerRequestChats = "viewerRequestChats",
  uniqueCollection = "uniqueCollection",
  collections = "collections",
}

type QueryVarsAction = {
  type: "add" | "reset" | "preload" | "add-preload";
  payload?: {
    query: PreloadQuery;
    variables: {};
  };
};

const initialQueryVarState = {
  user: "",
  userFeed: "",
  savedPosts: "",
  taggedPosts: "",
  post: "",
  hashTag: { name: "" },
  postLikes: "",
  followers: "",
  following: "",
  comments: "",
  commentLikes: "",
  uniqueComment: "",
  uniqueChat: "",
  activity: "",
  followingPosts: "",
  explorePosts: "",
  suggestedUsers: "",
  followRequests: "",
  userModal: "",
  viewerChats: "",
  replyLikes: "",
  isPreload: false,
  location: "",
  viewerRequestChats: "",
  uniqueCollection: "",
  collections: "",
};

function queryVarsReducer(state: QueryVarsType, action: QueryVarsAction) {
  const { type, payload } = action;
  switch (type) {
    case "add":
      return {
        ...state,
        [payload?.query as keyof QueryVarsType]: payload?.variables,
      };
    case "add-preload":
      return {
        ...state,
        [payload?.query as keyof QueryVarsType]: payload?.variables,
        isPreload: true,
      };
    case "preload":
      return { ...state, isPreload: state.isPreload ? false : true };
    case "reset":
      return initialQueryVarState;
  }
}

export const DataProvider = ({ children }: DataContextProviderProps) => {
  const location = useLocation();
  const [queryVarsState, queryVarsDispatch] = useReducer(
    queryVarsReducer,
    initialQueryVarState
  );

  const [isFooterNavHidden, setIsFooterNavHidden] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [footerMessage, setFooterMessage] = useState("");
  const [headerAttrs, setHeaderAttrs] = useState({});
  const [modalAttrs, setModalAttrs] = useState<ModalType | null>(null);

  const [urlFiles, setUrlFiles] = useState<IUrlFile[]>([]);
  const [imageToUpload, setImageToUpload] = useState<ImageToUploadI | null>(
    null
  );
  const unfollowButtonRef = useRef<HTMLButtonElement>();
  const navigate = useNavigate();
  const [resultViewer, reexecuteViewerQuery] = useQuery({
    query: Me,
  });

  const [resultUser, reexecuteUserQuery] = useQuery({
    query: UniqueUser,
    variables: queryVarsState.user,
    pause: !queryVarsState.user,
    requestPolicy: "cache-and-network",
  });

  const [resultUserModal] = useQuery({
    query: UniqueUser,
    variables: queryVarsState.userModal,
    pause: !queryVarsState.userModal,
  });

  const [resultFollowing, reexecuteFollowingQuery] = useQuery({
    query: Following,
    variables: queryVarsState.following,
    pause: !queryVarsState.following,
  });

  const [resultFollowers, reexecuteFollowersQuery] = useQuery({
    query: Followers,
    variables: queryVarsState.followers,
    pause: !queryVarsState.followers,
    requestPolicy: "cache-and-network",
  });

  const [resultPost, reexecutePostQuery] = useQuery({
    query: UniquePost,
    variables: queryVarsState.post,
    pause: !queryVarsState.post,
    requestPolicy: "cache-and-network",
  });

  const [resultPostLikes, reexecutePostLikesQuery] = useQuery({
    query: PostLikes,
    variables: queryVarsState.postLikes,
    pause: !queryVarsState.postLikes,
    requestPolicy: "cache-and-network",
  });

  const [resultCommentLikes, reexecuteCommentLikesQuery] = useQuery({
    query: CommentLikes,
    variables: queryVarsState.commentLikes,
    pause: !queryVarsState.commentLikes,
    requestPolicy: "cache-and-network",
  });

  const [resultReplyLikes] = useQuery({
    query: ReplyLikes,
    variables: queryVarsState.replyLikes,
    pause: !queryVarsState.replyLikes,
  });

  const [resultComments, reexecuteCommentsQuery] = useQuery({
    query: Comments,
    variables: queryVarsState.comments,
    pause: !queryVarsState.comments,
  });

  const [resultUniqueComment, reexecuteUniqueCommentQuery] = useQuery({
    query: UniqueComment,
    variables: queryVarsState.uniqueComment,
    pause: !queryVarsState.uniqueComment,
  });

  const [resultHashTag, reexecuteHashTagQuery] = useQuery({
    query: HashTag,
    variables: queryVarsState.hashTag,
    pause: !queryVarsState.hashTag.name,
  });

  const [resultSuggestedUsers] = useQuery({
    query: SuggestedUsers,
    variables: queryVarsState.suggestedUsers,
    pause: !queryVarsState.suggestedUsers,
  });

  const [resultExplorePosts] = useQuery({
    query: ExplorePosts,
    variables: queryVarsState.explorePosts,
    pause: !queryVarsState.explorePosts,
  });

  const [resultFollowingPosts] = useQuery({
    query: FollowingPosts,
    variables: queryVarsState.followingPosts,
    pause: !queryVarsState.followingPosts,
  });

  const [resultUniqueChat] = useQuery({
    query: UniqueChat,
    variables: queryVarsState.uniqueChat,
    pause: !queryVarsState.uniqueChat,
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!resultUniqueChat.error) return;
    console.log("MESSAGE DATE RESET!");
    navigate("/direct/inbox/");
    setMessagesDate(new Date().toISOString());
  }, [resultUniqueChat.error]);

  const [resultViewerChats] = useQuery({
    query: ViewerChats,
    variables: queryVarsState.viewerChats,
    pause: !queryVarsState.viewerChats,
    requestPolicy: "cache-and-network",
  });

  const [resultRequestChats] = useQuery({
    query: ViewerRequestChats,
    variables: queryVarsState.viewerRequestChats,
    pause: !queryVarsState.viewerRequestChats,
  });

  const [resultActivity] = useQuery({
    query: ViewerActivty,
    variables: queryVarsState.activity,
    pause: !queryVarsState.activity,
  });

  const [resultFollowRequests] = useQuery({
    query: ViewerFollowRequests,
    variables: queryVarsState.followRequests,
    pause: !queryVarsState.followRequests,
    requestPolicy: "cache-and-network",
  });

  const [resultSavedPosts] = useQuery({
    query: SavedPosts,
    variables: queryVarsState.savedPosts,
    pause: !queryVarsState.savedPosts,
  });

  const [resultLocation] = useQuery({
    query: UniqueLocation,
    variables: queryVarsState.location,
    pause: !queryVarsState.location,
  });

  const [resultUniqueCollection] = useQuery({
    query: UniqueCollection,
    variables: queryVarsState.uniqueCollection,
    pause: !queryVarsState.uniqueCollection,
  });

  const [resultCollections] = useQuery({
    query: ViewerCollections,
    variables: queryVarsState.collections,
    pause: !queryVarsState.collections,
  });

  const [updateRead] = useSubscription({
    query: ReadMessage,
  });

  useEffect(() => {
    console.log({ updateRead });
  }, [updateRead]);

  const [deletedMessage] = useSubscription({ query: DeletedMessage });

  const [resultNewUnreadCount] = useSubscription({ query: UnreadMessageCount });
  useEffect(() => {
    console.log({ resultNewUnreadCount });
    // setMessagesDate(new Date().toISOString());
  }, [resultNewUnreadCount]);

  const [resultNewActivity] = useSubscription({ query: NewActivity });

  useEffect(() => {
    console.log({ resultNewActivity });
    setActivityDate(new Date().toISOString());
  }, [resultNewActivity]);

  const [removeProfilePhotoResult, removeProfilePhotoMutation] =
    useMutation(RemoveProfilePhoto);

  const removeProfilePhotoHandler = () => {
    setModalAttrs(null);
    removeProfilePhotoMutation().then((result) => {
      if (result.error) setFooterMessage(result.error.graphQLErrors[0].message);
      if (result.data) setFooterMessage("Profile photo removed");
    });
  };

  const [uploadProfilePhotoResult, uploadProfilePhoto] =
    useMutation(UploadProfilePhoto);

  const uploadProfilePhotoHandler = () => {
    navigate(-1);
    uploadProfilePhoto({ url: imageToUpload?.base64 }).then((result) => {
      if (result.error) {
        setFooterMessage(result.error.graphQLErrors[0].message);
      }
      if (result.data) {
        setFooterMessage("Profile photo saved.");
      }
    });
  };

  const { loadPhoto } = useProfilePhotoCanvas(urlFiles[0]);

  useEffect(() => {
    //centers and resizes profile photo automatically if not on mobile.
    if (urlFiles[0]?.type === "profile-photo" && !isMobile) {
      loadPhoto().then((result) => {
        setModalAttrs(null);
        uploadProfilePhoto({ url: result.base64 }).then((result) => {
          setUrlFiles([]);
          if (result.error) {
            setFooterMessage(result.error.graphQLErrors[0].message);
          }
          if (result.data) {
            console.log(result.data);
            setFooterMessage("Profile photo saved.");
          }
        });
      });
    }
  }, [urlFiles]);

  const [addUserSearchResult, addUserSearch] = useMutation(AddUserSearch);
  const addRecentUserSearch = (userId: string) => {
    addUserSearch({ userId });
  };

  const [addHashTagSearchResult, addHashTagSearch] =
    useMutation(AddHashTagSearch);
  const addRecentHashTagSearch = (hashTagName: string) => {
    addHashTagSearch({ hashTagName });
  };

  useEffect(() => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      return setIsMobile(true);
    }
    setIsMobile(false);
  }, []);

  const [messagesDate, setMessagesDate] = useState(new Date().toISOString());
  const [activityDate, setActivityDate] = useState(new Date().toISOString());
  const [followingPostsDate, setFollowingPostsDate] = useState(
    new Date().toISOString()
  );
  const [isNewPosts, setIsNewPosts] = useState(false);

  const followingPostsInfinitePagination = useInfinitePagination({ limit: 12 });
  const [scrollY, setScrollY] = useState<number>();
  const [resultNewPosts] = useSubscription({
    query: NewPosts,
  });

  useEffect(() => {
    console.log("globalContextLoaded");
  }, []);

  useEffect(() => {
    if (isNewPosts === false && resultNewPosts.data) setIsNewPosts(true);
  }, [resultNewPosts.data]);

  const [replyVars, setReplyVars] = useState<{
    username: string;
    commentId: string;
  } | null>(null);

  const [newReplyCommentId, setNewReplyCommentId] = useState<string>();

  const [profileModalAttrs, setProfileModalAttrs] =
    useState<ProfileModalType | null>(null);
  const profileModalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useLayoutEffect(() => {
    if (profileModalTimerRef.current)
      clearTimeout(profileModalTimerRef.current);
    setProfileModalAttrs(null);
  }, [location]);

  const [isModal, setIsModal] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [openMessageMenuId, setOpenMessageMenuId] = useState("");

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const [isSuggestedUsersPopular] = useState(Math.random() < 0.5);

  const [resultDeletePost, deletePostMutation] = useMutation(DeletePost);

  const deletePostHandler = (postId: string) => {
    setModalAttrs(null);
    deletePostMutation({ postId }).then((result) => {
      if (result.error) setFooterMessage("Error removing post.");
      if (result.data) setFooterMessage("Post removed successfully.");
    });
  };

  const [savedPostMutationDetails, setSavedPostMutationDetails] =
    useState<SavedPostMutationDetailsI | null>(null);

  const [resultSaveToCollection, saveToCollectionMutation] =
    useMutation(AddCollectionPosts);
  const [resultDeleteCollectedPost, deleteCollectedPost] = useMutation(
    DeleteCollectionPosts
  );
  const [resultUnsavePost, unsavePostMutation] = useMutation(UnsavePost);

  const saveToCollectionHandler = (postId: string, collection: CollectionI) => {
    setSavedPostMutationDetails({ postId, collection });
    saveToCollectionMutation({
      collectionId: collection.id,
      postIds: [postId],
    }).then((result) => {
      if (result.error) setFooterMessage("Error saving post.");
    });
  };

  const removeCollectionPostHandler = (
    postId: string,
    collection: CollectionI
  ) => {
    setSavedPostMutationDetails({ postId, collection, isDelete: true });
    deleteCollectedPost({
      postIds: [postId],
      collectionId: collection.id,
    }).then((result) => {
      if (result.error) setFooterMessage("Error saving post.");
    });
  };

  const unsavePostHandler = (postId: string) => {
    setModalAttrs(null);
    unsavePostMutation({ postId }).then((result) => {
      if (result.error) setFooterMessage("Error removing post.");
    });
  };

  const { resetClient } = useClient() as ClientStateI;

  const [result, logOutMutation] = useMutation(LogOut);

  const logOut = async () => {
    await logOutMutation();
    setModalAttrs(null);
    resetClient();
    setAccessToken("");
    setHeaderAttrs({});
    followingPostsInfinitePagination.scrollDispatch({ type: "reset" });
    navigate("/");
  };

  return (
    <GlobalContext.Provider
      value={{
        logOut,
        followingPostsInfinitePagination,
        unsavePostHandler,
        removeCollectionPostHandler,
        saveToCollectionHandler,
        savedPostMutationDetails,
        setSavedPostMutationDetails,
        resultCollections,
        resultUniqueCollection,
        deletePostHandler,
        messagesDate,
        resultRequestChats,
        activityDate,
        resultUserModal,
        isSuggestedUsersPopular,
        isCreatePostOpen,
        setIsCreatePostOpen,
        openMessageMenuId,
        setOpenMessageMenuId,
        chatContainerRef,
        isModal,
        setIsModal,
        profileModalTimerRef,
        profileModalAttrs,
        setProfileModalAttrs,
        resultSavedPosts,
        resultReplyLikes,
        newReplyCommentId,
        setNewReplyCommentId,
        setReplyVars,
        replyVars,
        isNewPosts,
        setIsNewPosts,
        resultNewPosts,
        setFollowingPostsDate,
        followingPostsDate,
        scrollY,
        setScrollY,
        resultLocation,
        resultFollowRequests,
        resultActivity,
        resultViewerChats,
        resultUniqueChat,
        resultFollowingPosts,
        resultExplorePosts,
        resultSuggestedUsers,
        addRecentHashTagSearch,
        addRecentUserSearch,
        resultHashTag,
        resultUniqueComment,
        resultCommentLikes,
        resultComments,
        queryVarsDispatch,
        queryVarsState,
        resultPostLikes,
        resultPost,
        setModalAttrs,
        modalAttrs,
        isMobile,
        reexecuteViewerQuery,
        viewer: resultViewer,
        user: resultUser,
        footerMessage,
        setFooterMessage,
        headerAttrs,
        setHeaderAttrs,
        setUrlFiles,
        urlFiles,
        setIsFooterNavHidden,
        isFooterNavHidden,
        setImageToUpload,
        imageToUpload,
        uploadProfilePhotoHandler,
        uploadProfilePhotoResult,
        removeProfilePhotoResult,
        removeProfilePhotoHandler,
        unfollowButtonRef,
        resultFollowing,
        resultFollowers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
