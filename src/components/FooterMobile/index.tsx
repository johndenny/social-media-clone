import React, { useEffect, useRef, useState } from "react";
import {
  IconContainer,
  StyledContainer,
  FixedFooterContainer,
  SelectedBorder,
  StyledPreloadLink,
} from "./styled";
import { ReactComponent as HomeSvg } from "../../assets/svgs/home.svg";
import { ReactComponent as HomeSelectedSvg } from "../../assets/svgs/homeSelected.svg";
import { ReactComponent as SearchSvg } from "../../assets/svgs/search.svg";
import { ReactComponent as SearchSelectedSvg } from "../../assets/svgs/searchSelected.svg";
import { ReactComponent as NewPostSvg } from "../../assets/svgs/newPost.svg";
import { ReactComponent as ActivitySvg } from "../../assets/svgs/activity.svg";
import { ReactComponent as ActivitySelectedSvg } from "../../assets/svgs/activitySelected.svg";
import { useLocation } from "react-router-dom";
import { Spacer } from "../HeaderMobile/styled";
import { ProfilePhoto } from "../ProfilePhoto";
import { HiddenFileInput } from "../HiddenFileInput";
import useImageUpload from "../../hooks/useImageUpload";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import { ActivityPopUp } from "../ActivityPopUp";
import { NewDot } from "../ActivityPopUp/styled";
import { UserProfileI } from "../../types";

interface Props {
  user: UserProfileI;
}

export const FooterMobile = React.memo(function FooterMobile({ user }: Props) {
  const globalContext = useGlobalContext() as globalContextType;
  const location = useLocation();
  const { fileChangeHandler } = useImageUpload();

  const [selectedTab, setSelectedTab] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const pathnameArray = location.pathname
      .split("/")
      .filter((value) => value !== "");
    setSelectedTab(() => {
      switch (true) {
        case pathnameArray.length === 0:
          return "home";
        case pathnameArray[0] === "explore":
          return "explore";
        case pathnameArray[1] === "activity":
          return "activity";
        case pathnameArray[0] === user.username:
          return "profile";
        default:
          return "";
      }
    });
  }, [location]);

  return (
    <div>
      <Spacer></Spacer>
      <FixedFooterContainer>
        <StyledContainer>
          <IconContainer>
            <StyledPreloadLink
              to="/"
              query={PreloadQuery.followingPosts}
              queryResult={globalContext.resultFollowingPosts}
              variables={{
                limit: 12,
                skip: 0,
                date: globalContext.followingPostsDate,
              }}
            >
              {selectedTab === "home" ? <HomeSelectedSvg /> : <HomeSvg />}
            </StyledPreloadLink>
          </IconContainer>
          <IconContainer>
            <StyledPreloadLink
              to="/explore/"
              query={PreloadQuery.explorePosts}
              queryResult={globalContext.resultExplorePosts}
              variables={{ limit: 12, skip: 0 }}
            >
              {selectedTab === "explore" ? (
                <SearchSelectedSvg />
              ) : (
                <SearchSvg />
              )}
            </StyledPreloadLink>
          </IconContainer>
          <IconContainer>
            <button onClick={() => inputRef?.current?.click()}>
              <NewPostSvg />
            </button>
          </IconContainer>
          <IconContainer>
            {globalContext.viewer.data?.viewer.activityCounts.sum !== 0 && (
              <>
                <ActivityPopUp
                  counts={globalContext.viewer.data?.viewer.activityCounts}
                  position={"bottom"}
                />
                <NewDot></NewDot>
              </>
            )}

            <StyledPreloadLink
              to="/accounts/activity/"
              query={PreloadQuery.activity}
              queryResult={globalContext.resultActivity}
              variables={{
                limit: 16,
                skip: 0,
                date: globalContext.activityDate,
              }}
            >
              {selectedTab === "activity" ? (
                <ActivitySelectedSvg />
              ) : (
                <ActivitySvg />
              )}
            </StyledPreloadLink>
          </IconContainer>
          <IconContainer>
            {selectedTab === "profile" && <SelectedBorder></SelectedBorder>}
            <StyledPreloadLink
              to={`/${user.username}`}
              query={PreloadQuery.user}
              queryResult={globalContext.user}
              variables={{ username: user.username, limit: 12, skip: 0 }}
            >
              <ProfilePhoto
                username={user.username}
                id={user.id}
                photoVersion={user.photoVersion}
                height="24px"
                isWithoutLink={true}
                isWithoutModal={true}
              />
            </StyledPreloadLink>
          </IconContainer>
        </StyledContainer>
        <HiddenFileInput
          name="photo-post"
          inputRef={inputRef}
          fileChangeHandler={fileChangeHandler}
        />
      </FixedFooterContainer>
    </div>
  );
});
