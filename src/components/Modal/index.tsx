import React, { useEffect, useState } from "react";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { MessageProps } from "../../routes/Direct/Chat";
import { UserNamesI } from "../../types";
import { CreatePost } from "../CreatePost";
import { PostValues } from "../PostItem";
import { DeleteChat } from "./components/DeleteChat";
import { DiscardPhoto } from "./components/DiscardPhoto";
import { DiscardPost } from "./components/DiscardPost";
import { EditProfilePhoto } from "./components/EditProfilePhoto";
import { Follow } from "./components/Follow";
import { LeaveChat } from "./components/LeaveChat";
import { Message } from "./components/Message";
import { PostOptions } from "./components/PostOptions";
import { ViewerProfileOptions } from "./components/ViewerProfileOptions";
import { DeletePost } from "./components/DeletePost";
import { CollectionOptions } from "./components/CollectionOptions";
import { DeleteCollectionModal } from "./components/DeleteCollectionModal";
import { DeleteSavedPost } from "./components/DeleteSavedPost";
import { EditCollection } from "../../routes/Profile/Saved/Collection/EditCollection";
import { Likes } from "./components/Likes";
import { Post } from "./components/Post";
import { NewMessage } from "./components/NewMessage";
import { Share } from "./components/Share";
import { Add } from "./components/Add";
import { MessageLikes } from "./components/MessageLikes";
import { SaveToCollection } from "./components/SaveToCollection";
import { SaveToNewCollection } from "./components/SaveToNewCollection";
import { CreateCollection } from "./components/CreateCollection";
import { AddRemoveFromSaved } from "./components/AddRemoveFromSaved";
import { LogIn } from "./components/LogIn";
import { Comment } from "./components/Comment";
import { Reply } from "./components/Reply";
import { Members } from "./components/Members";
import { FollowersModal } from "./components/FollowersModal";
import { FollowingModal } from "./components/FollowingModal";
import { EditCollectionModal } from "./components/EditCollectionModal";
import { DeleteTag } from "./components/DeleteTag";

export type ModalType =
  | NoVariablesModalI
  | IdModalI
  | FollowModalI
  | CommentModalI
  | ReplyModalI
  | ShareModalI
  | AddModalI
  | PostOptionsModalI
  | MessageModalI
  | SaveToCollectionI
  | SaveToNewCollectionI
  | MembersModalI;

interface NoVariablesModalI {
  type:
    | "profile-photo"
    | "leave-chat"
    | "delete-chat"
    | "viewer-profile-options"
    | "post"
    | "create-post"
    | "leave-create-post"
    | "discard-post"
    | "discard-photo"
    | "following"
    | "followers"
    | "create-collection"
    | "add-from-saved"
    | "remove-from-saved"
    | "edit-collection"
    | "log-in"
    | "log-in-switch"
    | "new-message";
  variables?: undefined;
}

interface FollowModalI {
  type: "follow";
  variables: FollowModalVariablesI;
}

interface FollowModalVariablesI {
  id: string;
  username: string;
  photoVersion: number;
}

interface CommentModalI {
  type: "comment";
  variables: CommentModalVariablesI;
}

interface CommentModalVariablesI {
  id: string;
  removeCommentHandler: (commentId: string) => void;
}

interface ReplyModalI {
  type: "reply";
  variables: ReplyModalVariablesI;
}

interface ReplyModalVariablesI {
  id: string;
  removeReplyHandler: (replyId: string) => void;
}

interface ShareModalI {
  type: "share";
  variables: ShareModalVariablesI;
}

interface ShareModalVariablesI {
  id: string;
  message?: MessageProps;
}

interface AddModalI {
  type: "add";
  variables: AddModalVariables;
}

interface AddModalVariables {
  members: UserNamesI[];
}

interface PostOptionsModalI {
  type: "post-options" | "delete-tag";
  variables: PostOptionsModalVariablesI;
}

interface PostOptionsModalVariablesI {
  post: PostValues;
}

interface IdModalI {
  type:
    | "post-delete"
    | "message-likes"
    | "post-likes"
    | "comment-likes"
    | "reply-likes"
    | "collection-options"
    | "delete-collection"
    | "delete-saved-post";
  variables: IdModalVariablesI;
}
interface IdModalVariablesI {
  id: string;
}

interface MembersModalI {
  type: "members";
  variables: MembersModalVariablesI;
}

interface MembersModalVariablesI {
  id: string;
  isAdmin: boolean;
}

interface MessageModalI {
  type: "message";
  variables: MessageModalVariablesI;
}

interface MessageModalVariablesI {
  id: string;
  text: string;
}

export interface SaveToCollectionI {
  type: "save-to-collection";
  variables: SaveToCollectionVariablesI;
}

export interface SaveToCollectionVariablesI {
  id: string;
  photoId: string;
  isCollected: boolean;
}

export interface SaveToNewCollectionI {
  type: "save-to-new-collection";
  variables: SaveToNewCollectionVariablesI;
}

export interface SaveToNewCollectionVariablesI {
  id: string;
  photoId: string;
}

export const Modal: React.FC<ModalType> = ({ type, variables }) => {
  const { setIsModal, isModal, setOpenMessageMenuId } =
    useGlobalContext() as globalContextType;

  const [isSecondModal, setIsSecondModal] = useState(false);

  useEffect(() => {
    if (isModal) setIsSecondModal(true);
    setIsModal(true);

    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = "fixed";

    return () => {
      if (isSecondModal) return;
      if (type === "share" && variables.message) setOpenMessageMenuId("");
      const scrollY = document.body.style.top;
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);

      setIsModal(false);
    };
  }, [isSecondModal]);

  switch (type) {
    case "followers":
      return <FollowersModal />;

    case "following":
      return <FollowingModal />;

    case "create-post":
      return <CreatePost />;

    case "comment-likes":
    case "reply-likes":
    case "post-likes":
      return <Likes id={variables.id} type={type} />;

    case "post":
      return <Post />;

    case "new-message":
      return <NewMessage />;

    case "share":
      return <Share id={variables.id} message={variables.message} />;

    case "add":
      return <Add members={variables.members} />;

    case "message-likes":
      return <MessageLikes id={variables.id} />;

    case "save-to-collection":
      return <SaveToCollection {...variables} />;

    case "save-to-new-collection":
      return (
        <SaveToNewCollection id={variables.id} photoId={variables.photoId} />
      );

    case "create-collection":
      return <CreateCollection />;

    case "add-from-saved":
    case "remove-from-saved":
      return <AddRemoveFromSaved type={type} />;

    case "edit-collection":
      return <EditCollectionModal />;

    case "log-in":
    case "log-in-switch":
      return <LogIn type={type} />;

    case "delete-saved-post":
      return <DeleteSavedPost postId={variables.id} />;

    case "delete-collection":
      return <DeleteCollectionModal id={variables.id} />;

    case "collection-options":
      return <CollectionOptions id={variables.id} />;

    case "post-delete":
      return <DeletePost postId={variables.id} />;

    case "discard-photo":
      return <DiscardPhoto />;

    case "discard-post":
      return <DiscardPost />;

    case "leave-create-post":
      return <DiscardPost isClosing={true} />;

    case "profile-photo":
      return <EditProfilePhoto />;

    case "leave-chat":
      return <LeaveChat />;

    case "delete-chat":
      return <DeleteChat />;

    case "viewer-profile-options":
      return <ViewerProfileOptions />;

    case "post-options":
      return <PostOptions post={variables.post} />;

    case "delete-tag":
      return <DeleteTag post={variables.post} />;

    case "message":
      return <Message messageId={variables.id} text={variables.text} />;

    case "follow":
      return <Follow {...variables} />;

    case "comment":
      return <Comment {...variables} />;

    case "reply":
      return <Reply {...variables} />;

    case "members":
      return <Members id={variables.id} isAdmin={variables.isAdmin} />;

    default:
      return <></>;
  }
};
