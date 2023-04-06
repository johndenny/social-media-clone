import React, { SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as AcitivtySvg } from "../../../../assets/svgs/activity.svg";
import { ReactComponent as ActivitySelectedSvg } from "../../../../assets/svgs/activitySelected.svg";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { Activity } from "../../../../routes/Accounts/Activity";
import { Button, Triangle } from "../../../../styled";
import { ActivityPopUp } from "../../../ActivityPopUp";
import { ClickCatch } from "../../styled";
import { DropDownContent } from "../NavigationSearch/styled";
import { ContentHeight, DropDownContainer, NewDot } from "./styled";

interface Props {
  setIsDropDown: React.Dispatch<SetStateAction<boolean>>;
}

export const NavigationActivty: React.FC<Props> = ({ setIsDropDown }) => {
  const { viewer } = useGlobalContext() as globalContextType;
  const location = useLocation();
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
    if (!isClicked) return;
    setIsAnimating(true);
  }, [location]);

  if (!viewer.data) return <></>;

  return (
    <div>
      <Button onClick={clickHandler}>
        {isClicked ? <ActivitySelectedSvg /> : <AcitivtySvg />}
      </Button>
      {isClicked && (
        <ClickCatch onClick={() => setIsAnimating(true)}></ClickCatch>
      )}
      {viewer.data?.viewer.activityCounts.sum !== 0 && (
        <>
          <NewDot></NewDot>
          <ActivityPopUp
            counts={viewer.data?.viewer.activityCounts}
            position={"top"}
          />
        </>
      )}

      <DropDownContainer>
        {isClicked && (
          <DropDownContent
            isAnimating={isAnimating}
            onAnimationEnd={() => setIsClicked(false)}
          >
            <Triangle
              color="rgba(var(--primary-background))"
              height={8}
              isFlipped={false}
              left="435px"
            ></Triangle>
            <ContentHeight>
              <Activity />
            </ContentHeight>
          </DropDownContent>
        )}
      </DropDownContainer>
    </div>
  );
};
