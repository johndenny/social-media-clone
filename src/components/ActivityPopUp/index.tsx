import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Triangle } from "../../styled";
import { Content } from "./Content";
import { ContainerBottom, ContainerTop } from "./styled";

export type ActivityCountsType = {
  likes: number;
  comments: number;
  follows: number;
  tagged: number;
  followRequests: number;
  totalFollowRequests: number;
  sum: number;
};

interface Props {
  counts: ActivityCountsType;
  position: "top" | "bottom";
}

export const ActivityPopUp: React.FC<Props> = ({ counts, position }) => {
  const location = useLocation();
  const [isVisable, setIsVisable] = useState(true);

  useEffect(() => {
    if (!isVisable) setIsVisable(true);
    setTimeout(() => {
      setIsVisable(false);
    }, 2000);
  }, [location]);

  if (position === "bottom")
    return (
      <ContainerBottom isVisable={isVisable}>
        <Triangle
          color="rgb(var(--badge))"
          height={8}
          isFlipped={true}
          left="50%"
        ></Triangle>
        <Content counts={counts} />
      </ContainerBottom>
    );

  return (
    <ContainerTop isVisable={isVisable}>
      <Triangle
        color="rgb(var(--badge))"
        height={8}
        isFlipped={false}
        left="50%"
      ></Triangle>
      <Content counts={counts} />
    </ContainerTop>
  );
};
