import React, { useEffect, useState } from "react";
import { Button, Triangle } from "../../../../styled";
import { ProfilePhoto } from "../../../ProfilePhoto";
import { ClickCatch } from "../../styled";
import { DropDownContent } from "../NavigationSearch/styled";
import {
  DropDownContainer,
  DropDownLink,
  DropDownWidth,
  ProfilePhotoContianer,
} from "./styled";
import { ReactComponent as ProfileSvg } from "../../../../assets/svgs/profile.svg";
import { ReactComponent as SavedSvg } from "../../../../assets/svgs/unsaved.svg";
import { ReactComponent as SettingSvg } from "../../../../assets/svgs/options.svg";
import { ReactComponent as SwitchSvg } from "../../../../assets/svgs/switch.svg";
import { SelectedBorder } from "../../../FooterMobile/styled";
import { PreloadLink } from "../../../PreloadLink";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../context/GlobalContext";
import { BottomLink } from "./styled/BottomLink";
import { Link, useLocation } from "react-router-dom";

interface Props {
  selectedIcon: string;
  setIsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavigationProfile: React.FC<Props> = ({
  selectedIcon,
  setIsDropDown,
}) => {
  const { setModalAttrs, viewer, user, resultSavedPosts, logOut } =
    useGlobalContext() as globalContextType;
  const location = useLocation();
  const { data, fetching } = viewer;
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const clickHandler = () => {
    setIsClicked(true);
    setIsDropDown(true);
  };

  useEffect(() => {
    if (isAnimating && !isClicked) {
      setIsAnimating(false);
      setIsDropDown(false);
    }
  }, [isClicked]);

  useEffect(() => {
    if (isClicked) setIsAnimating(true);
  }, [location]);

  const switchClick = () => {
    setModalAttrs({ type: "log-in-switch" });
    setIsAnimating(true);
  };

  if (!data || fetching) return <></>;

  return (
    <div>
      <ProfilePhotoContianer>
        {(isClicked || selectedIcon === "profile") && (
          <SelectedBorder></SelectedBorder>
        )}
        <Button onClick={clickHandler}>
          <ProfilePhoto
            height={"24px"}
            photoVersion={data.viewer.photoVersion}
            id={data.viewer.id}
            username={data.viewer.username}
            isWithoutLink={true}
          />
        </Button>
      </ProfilePhotoContianer>

      {isClicked && (
        <ClickCatch onClick={() => setIsAnimating(true)}></ClickCatch>
      )}
      <DropDownContainer>
        {isClicked && (
          <DropDownContent
            isAnimating={isAnimating}
            onAnimationEnd={() => setIsClicked(false)}
          >
            <DropDownWidth>
              <Triangle
                color="rgb(var(--primary-background))"
                height={8}
                isFlipped={false}
                left="192px"
              ></Triangle>
              <PreloadLink
                to={`/${viewer.data.viewer.username}/`}
                query={PreloadQuery.user}
                queryResult={user}
                variables={{
                  username: viewer.data.viewer.username,
                  limit: 12,
                  skip: 0,
                }}
              >
                <DropDownLink>
                  <ProfileSvg />
                  <span>Profile</span>
                </DropDownLink>
              </PreloadLink>
              <PreloadLink
                to={`/${viewer.data?.viewer.username}/saved`}
                query={PreloadQuery.savedPosts}
                queryResult={resultSavedPosts}
                variables={{
                  limit: 12,
                  skip: 0,
                }}
              >
                <DropDownLink>
                  <SavedSvg stroke="#262626" height="16" width="16" />
                  <span>Saved</span>
                </DropDownLink>
              </PreloadLink>
              <Link to="/accounts/edit/">
                <DropDownLink>
                  <SettingSvg height="16" width="16" />
                  <span>Settings</span>
                </DropDownLink>
              </Link>

              <DropDownLink onClick={switchClick}>
                <SwitchSvg />
                <span>Switch accounts</span>
              </DropDownLink>
              <BottomLink onClick={logOut}>
                <DropDownLink>Log Out</DropDownLink>
              </BottomLink>
            </DropDownWidth>
          </DropDownContent>
        )}
      </DropDownContainer>
    </div>
  );
};
