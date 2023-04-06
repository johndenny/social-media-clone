import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  HeaderMobile,
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../../components/HeaderMobile";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { Saved } from "..";
import { FooterButton, Input, Padding } from "./styled";
import { useMutation } from "urql";
import { CreateCollection } from "../../../../graphQL/mutations";
import { LocationState } from "../../../../App";

interface Props {}

export const NewCollection: React.FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const {
    isMobile,
    setHeaderAttrs,
    setIsFooterNavHidden,
    setFooterMessage,
    viewer,
  } = useGlobalContext() as globalContextType;

  const [nameText, setNameText] = useState("");
  const [isAddPostsPage, setIsAddPostsPage] = useState(false);
  const [postIds, setPostIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [createCollectionResult, createCollectionMutation] =
    useMutation(CreateCollection);

  useEffect(() => {
    if (!isMobile && !(location.state as LocationState)?.background)
      navigate("", { state: { background: `/${params.username}/saved/` } });
  }, []);

  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    if (!isMobile) return;

    setIsFooterNavHidden(true);
    if (isAddPostsPage)
      setHeaderAttrs({
        leftButton: LeftHeaderButton.backChevron,
        leftOnClick: () => setIsAddPostsPage(false),
        title: "Add from saved",
        rightButton: createCollectionResult.fetching
          ? RightHeaderButton.fetching
          : RightHeaderButton.done,
        rightOnClick: createCollectionHandler,
      });

    if (!isAddPostsPage)
      setHeaderAttrs({
        leftButton: LeftHeaderButton.close,
        leftOnClick: () => navigate(`/${params.username}/saved/`),
        title: "New collection",
        rightButton: RightHeaderButton.next,
        rightOnClick: nameText ? () => setIsAddPostsPage(true) : undefined,
      });

    return () => {
      setIsFooterNavHidden(false);
    };
  }, [isAddPostsPage, nameText, createCollectionResult.fetching, postIds]);

  const createCollectionHandler = () => {
    createCollectionMutation({ name: nameText, savedPostIds: postIds }).then(
      (result) => {
        if (result.error) {
          navigate(`/${params.username}/saved/`);
          setFooterMessage("Error creating collection.");
        }
        if (result.data) {
          console.log(result.data);
          const { nameLink, id } = result.data.createCollection.collection;
          console.log(`/${params.username}/saved/${nameLink}/${id}/`);
          navigate(`/${params.username}/saved/${nameLink}/${id}/`);
          setFooterMessage("Collection created.");
        }
      }
    );
  };

  if (params.username && viewer?.data?.viewer?.username !== params.username)
    return <Navigate to={`/${params.username}/`} />;

  return (
    <>
      {!isMobile && (
        <HeaderMobile
          leftButton={isAddPostsPage ? LeftHeaderButton.backChevron : undefined}
          leftOnClick={
            isAddPostsPage ? () => setIsAddPostsPage(false) : undefined
          }
          title={isAddPostsPage ? "Add from saved" : "New collection"}
          rightButton={RightHeaderButton.close}
          rightOnClick={() => navigate(-1)}
        />
      )}
      {isAddPostsPage ? (
        <>
          <div style={!isMobile ? { maxHeight: "500px" } : { flex: 1 }}>
            <Saved postIds={postIds} setPostIds={setPostIds} isSaved={true} />
          </div>

          {!isMobile && (
            <FooterButton onClick={createCollectionHandler}>Done</FooterButton>
          )}
        </>
      ) : (
        <>
          <Padding>
            <Input
              ref={inputRef}
              placeholder="Collection Name"
              type="text"
              autoComplete="off"
              onChange={(e) => setNameText(e.currentTarget.value)}
              value={nameText}
            />
          </Padding>
          {!isMobile && (
            <FooterButton
              onClick={() => setIsAddPostsPage(true)}
              disabled={!nameText}
            >
              Next
            </FooterButton>
          )}
        </>
      )}
    </>
  );
};
