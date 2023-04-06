import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "urql";
import { NavigationButton } from "../../../components/CreatePost/components/Crop/GalleryModal/styled";
import { PreloadLink } from "../../../components/PreloadLink";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import { HideUser } from "../../../graphQL/mutations";
import { PopularUsers, SuggestedUsers } from "../../../graphQL/queries";
import { useGalleryNavigation } from "../../../hooks/useGalleryNavigation";
import useGlobalContext from "../../../hooks/useGlobalContext";
import useWindowSize from "../../../hooks/useWindowSize";
import { UserListI } from "../../../types";
import {
  Header,
  ListContainer,
  ListItem,
  Section,
  Title,
  UnorderedList,
} from "./styled";
import { UserCard } from "./UserCard";
import { ChevronSprite } from "./UserCard/styled";

interface HiddenUserI extends UserListI {
  index: number;
}

interface Props {}

export const SuggestedUserGallery: React.FC<Props> = () => {
  const { width } = useWindowSize();
  const { isMobile, resultSuggestedUsers, isSuggestedUsersPopular } =
    useGlobalContext() as globalContextType;
  const [limit, setLimit] = useState(30);

  const [results] = useQuery({
    query: isSuggestedUsersPopular ? PopularUsers : SuggestedUsers,
    variables: { limit, skip: 0 },
  });
  const { data } = results;
  const profiles = isSuggestedUsersPopular
    ? data?.popularUsers.profiles
    : data?.suggestedUsers.profiles;

  const [result, hideUserMutation] = useMutation(HideUser);

  const containerRef = useRef<HTMLTableSectionElement | null>(null);
  const [extraEndSpace, setExtraEndSpace] = useState(0);
  const [hiddenUser, setHiddenUser] = useState<HiddenUserI | null>(null);
  const isRightNavigationHidden = useRef(false);

  const isWide = width > 599;
  const itemWidth = isWide ? 200 : 161;
  const startAndEndPadding = isWide ? 12 : 16;

  useEffect(() => {
    if (!containerRef.current) return;

    setExtraEndSpace(containerRef.current.clientWidth - itemWidth * 2);
  }, [data, width]);

  const [navigationHandler, galleryState, galleryDispatch] =
    useGalleryNavigation({
      itemWidth: itemWidth,
      maxMovement:
        (profiles?.length - 2) * itemWidth -
        (extraEndSpace - startAndEndPadding * 2),
      arrayLength: profiles?.length - 2,
    });

  const { isTransition, selectedIndex, isDragging, dragDistance } =
    galleryState;

  const hideUserHandler = async (user: UserListI, index: number) => {
    if (index >= profiles.length - 2 && selectedIndex >= profiles.length - 2)
      isRightNavigationHidden.current = true;
    hideUserMutation({ id: user.id }).then((result) => {
      if (result.data) {
        setHiddenUser({ ...user, index });
        setLimit((prevState) => prevState - 1);
        if (
          index >= profiles.length - 2 &&
          selectedIndex >= profiles.length - 2
        )
          galleryDispatch({
            type: "navigate",
            payload: {
              selectedIndex: selectedIndex - 1,
              isTransition: true,
            },
          });
      }
    });
  };

  const ListTranslateXHandler = () => {
    if (isDragging) return dragDistance;

    if (selectedIndex === profiles.length - 2)
      return selectedIndex * itemWidth - extraEndSpace + startAndEndPadding * 2;

    return selectedIndex * itemWidth;
  };

  if (!data) return <></>;

  return (
    <Section ref={containerRef} isWide={isWide} isMobile={isMobile}>
      <Header isWide={isWide}>
        <Title>{"Suggestions for you"}</Title>
        <PreloadLink
          style={{ fontSize: "14px", color: "rgb(var(--primary-button))" }}
          to={"/explore/people/"}
          query={PreloadQuery.suggestedUsers}
          queryResult={resultSuggestedUsers}
          variables={{ limit: 16, skip: 0 }}
        >
          See All
        </PreloadLink>
      </Header>
      <ListContainer
        style={{ height: "216px" }}
        onTouchStart={() => galleryDispatch({ type: "touched" })}
      >
        <UnorderedList
          translateX={ListTranslateXHandler()}
          style={
            isTransition
              ? { transition: `transform 1s ease-in-out` }
              : undefined
          }
          onTransitionEnd={() => galleryDispatch({ type: "reset" })}
        >
          {/* shows animation after item is invalidated */}
          {hiddenUser && (
            <ListItem
              animate
              style={{
                transform: `translate(${
                  hiddenUser.index * itemWidth + startAndEndPadding
                }px)`,
              }}
              onAnimationEnd={() => {
                isRightNavigationHidden.current = false;
                setHiddenUser(null);
              }}
            >
              <div style={{ width: itemWidth, alignItems: "center" }}>
                <div style={{ width: `${isWide ? "176px" : "156px"}` }}>
                  <UserCard
                    isSuggestedUsersPopular={isSuggestedUsersPopular}
                    index={0}
                    hideUserHandler={hideUserHandler}
                    profile={hiddenUser}
                    isWide={isWide}
                  />
                </div>
              </div>
            </ListItem>
          )}

          <li style={{ width: "12px", display: "flex" }}></li>
          {profiles.map((profile: UserListI, index: number) => {
            if (selectedIndex - 6 > index) return undefined;
            if (selectedIndex + 6 < index) return undefined;

            const translateX = index * itemWidth + startAndEndPadding;

            return (
              <ListItem
                key={profile.id}
                style={{
                  transition: "all 300ms ease 0s",
                  transform: `translate(${translateX}px)`,
                }}
              >
                <div style={{ width: itemWidth, alignItems: "center" }}>
                  <div style={{ width: `${isWide ? "176px" : "156px"}` }}>
                    <UserCard
                      isSuggestedUsersPopular={isSuggestedUsersPopular}
                      index={index}
                      hideUserHandler={hideUserHandler}
                      profile={profile}
                      isWide={isWide}
                    />
                  </div>
                </div>
              </ListItem>
            );
          })}
        </UnorderedList>
        {selectedIndex !== 0 && (
          <NavigationButton
            onClick={() =>
              navigationHandler({
                direction: "left",
                isTransition: true,
                itemsPassed: -2,
              })
            }
            style={{ padding: "8px" }}
          >
            <ChevronSprite></ChevronSprite>
          </NavigationButton>
        )}
        {selectedIndex < profiles.length - 2 && (
          <NavigationButton
            right
            onClick={() =>
              navigationHandler({
                direction: "right",
                isTransition: true,
                itemsPassed: 2,
              })
            }
            style={
              isRightNavigationHidden.current
                ? { padding: "8px", display: "none" }
                : { padding: "8px" }
            }
          >
            <ChevronSprite right></ChevronSprite>
          </NavigationButton>
        )}
      </ListContainer>
    </Section>
  );
};
