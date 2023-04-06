import { globalContextType } from "../context/GlobalContext";
import useGlobalContext from "./useGlobalContext";

interface Props {
  username: string;
}

export const useProfileModal = ({ username }: Props) => {
  const { setProfileModalAttrs, profileModalTimerRef } =
    useGlobalContext() as globalContextType;

  const mouseEnterHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (profileModalTimerRef.current)
      clearTimeout(profileModalTimerRef.current);

    const padding = 2;
    const scrollTop = window.scrollY;
    const { top, left, height, bottom } =
      e.currentTarget.getBoundingClientRect();
    const distanceFromBottom = window.innerHeight - bottom;

    let position = "bottom";
    let totalTop = scrollTop + top + height + padding;
    if (distanceFromBottom < 400) {
      position = "top";
      totalTop = scrollTop + top - padding;
    }

    profileModalTimerRef.current = setTimeout(() => {
      setProfileModalAttrs({
        username,
        top: totalTop,
        left,
        position,
      });
    }, 500);
  };

  const mouseLeaveHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (profileModalTimerRef.current)
      clearTimeout(profileModalTimerRef.current);
    profileModalTimerRef.current = setTimeout(() => {
      setProfileModalAttrs(null);
    }, 200);
  };

  return [mouseEnterHandler, mouseLeaveHandler];
};
