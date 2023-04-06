import { useEffect, useRef, useState } from "react";
import { globalContextType } from "../context/GlobalContext";
import useGlobalContext from "./useGlobalContext";

const MAX_PORTRAIT_RATIO = 4 / 5;
const MAX_PORTRAIT_WIDTH_PERCENT = MAX_PORTRAIT_RATIO * 100;
const MAX_LANDSCAPE_RATIO = 1.91 / 1;
const MAX_LANDSCAPE_HEIGHT_PERCENT = 100 / MAX_LANDSCAPE_RATIO;

export type ImageValues = {
  height: number;
  width: number;
  left: number;
  top: number;
  origin: { x: number; y: number };
  rotate: number;
  orientation: number;
  isExpanded: boolean;
};

export const useMobilePhotoMovement = (
  width: number | undefined,
  height: number | undefined,
  selectedTab: "edit" | "filter"
) => {
  const [values, setValues] = useState<ImageValues>({
    height: 0,
    width: 0,
    left: 0,
    top: 0,
    origin: { x: 50, y: 50 },
    rotate: 0,
    orientation: 0,
    isExpanded: false,
  });
  const { isMobile } = useGlobalContext() as globalContextType;
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [movement, setMovement] = useState<{ x: number; y: number } | null>(
    null
  );
  const [previousPosition, setPreviousPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [previousOrigin, setPreviousOrigin] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState<boolean | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //init image dimensions and location in percents for image to fill square
    if (isExpanded || !width || !height) return;
    let aspectRatio = width / height;
    let heightPercent = 0;
    let widthPercent = 0;
    let leftPercent = 0;
    let topPercent = 0;
    //landscape/square
    if (aspectRatio >= 1) {
      heightPercent = 100;
      widthPercent = aspectRatio * heightPercent;
      leftPercent = (heightPercent - widthPercent) / 2;
      //portrait
    } else {
      widthPercent = 100;
      heightPercent = 100 / aspectRatio;
      topPercent = (widthPercent - heightPercent) / 2;
    }
    setValues({
      ...values,
      height: heightPercent,
      width: widthPercent,
      left: leftPercent,
      top: topPercent,
    });
    setPreviousPosition({ x: leftPercent, y: topPercent });
    setPreviousOrigin(values.origin);
  }, [isExpanded]);

  useEffect(() => {
    //image dimensions and location in percents for image closer to aspect ratio with limits
    if (!isExpanded || !width || !height) return;

    const aspectRatio = width / height;
    let heightPercent = 0;
    let widthPercent = 0;
    let topPercent = 0;
    let leftPercent = 0;
    let maxLandscapeHeight = MAX_LANDSCAPE_HEIGHT_PERCENT;
    let maxPortraitWidth = MAX_PORTRAIT_WIDTH_PERCENT;

    //flips limits when portrait becomes landscape and vice versa
    if (values.orientation === 90 || values.orientation === 270) {
      maxLandscapeHeight = MAX_PORTRAIT_WIDTH_PERCENT;
      maxPortraitWidth = MAX_LANDSCAPE_HEIGHT_PERCENT;
    }
    //landscape/square
    if (aspectRatio >= 1) {
      widthPercent = 100;
      heightPercent = widthPercent / aspectRatio;
      if (heightPercent < maxLandscapeHeight) {
        heightPercent = maxLandscapeHeight;
        widthPercent = aspectRatio * maxLandscapeHeight;
        leftPercent = (100 - widthPercent) / 2;
      }
      topPercent = 50 - heightPercent / 2;
    }
    //portrait
    if (aspectRatio < 1) {
      heightPercent = 100;
      widthPercent = heightPercent * aspectRatio;
      leftPercent = (heightPercent - widthPercent) / 2;
      if (widthPercent < maxPortraitWidth) {
        heightPercent = maxPortraitWidth / aspectRatio;
        widthPercent = maxPortraitWidth;
        topPercent = (100 - heightPercent) / 2;
        leftPercent = (100 - maxPortraitWidth) / 2;
      }
    }

    setValues({
      ...values,
      height: heightPercent,
      width: widthPercent,
      left: leftPercent,
      top: topPercent,
    });
  }, [isExpanded, values.orientation]);

  useEffect(() => {
    if (selectedTab === "filter") return;
    document.addEventListener("touchstart", startHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("touchend", touchendHandler);
    return () => {
      document.removeEventListener("touchend", touchendHandler);
      document.removeEventListener("touchstart", startHandler);
      document.removeEventListener("touchmove", moveHandler);
    };
  }, [selectedTab]);

  const startHandler = (e: TouchEvent) => {
    if (e.target !== photoRef.current) return;
    setIsTouched(true);
    setStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const moveHandler = (e: TouchEvent) => {
    setIsDragging(true);
    setMovement({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const touchendHandler = () => {
    setIsDragging(false);
    setIsTouched(false);
  };

  useEffect(() => {
    //calculates distance from first touch and adds to previous values
    if (
      isExpanded ||
      !isDragging ||
      !isTouched ||
      !movement ||
      !start ||
      !previousPosition
    )
      return;
    const windowWidth = window.screen.width;
    const xStart = start.x;
    const yStart = start.y;
    const x = movement.x;
    const y = movement.y;
    const leftPercent = ((x - xStart) / windowWidth) * (isMobile ? 100 : 200);
    const topPercent = ((y - yStart) / windowWidth) * (isMobile ? 100 : 200);
    setValues({
      ...values,
      left: leftPercent + previousPosition.x,
      top: topPercent + previousPosition.y,
      origin: {
        x: (leftPercent / values.width) * 100 * -1 + previousOrigin.x,
        y: (topPercent / values.height) * 100 * -1 + previousOrigin.y,
      },
    });
  }, [movement]);

  useEffect(() => {
    //resets image movement to stay within bounds
    if (isDragging || isExpanded || !previousPosition || !width || !height)
      return;
    const aspectRatio = width / height;
    let newLeft = values.left;
    let newTop = values.top;
    let newOriginX = values.origin.x;
    let newOriginY = values.origin.y;
    //landscape/square
    if (aspectRatio >= 1) {
      if (newLeft > 0) {
        newLeft = 0;
      }
      if (newLeft < 100 - values.width) {
        newLeft = 100 - values.width;
      }
      if (newTop !== 0) {
        newTop = 0;
      }
      //top bottom overflow
      if (newOriginY !== 50) {
        newOriginY = 50;
      }
      const overflow =
        ((values.height - values.width) / 2 / values.width) * 100;
      //left overflow
      if (newOriginX < overflow + 50) {
        newOriginX = overflow + 50;
      }
      //right overflow
      if (newOriginX > overflow * -1 + 50) {
        newOriginX = overflow * -1 + 50;
      }
    }
    //portrait
    if (aspectRatio < 1) {
      if (newLeft !== 0) {
        newLeft = 0;
      }
      if (newTop > 0) {
        newTop = 0;
      }
      if (newTop < 100 - values.height) {
        newTop = 100 - values.height;
      }
      if (newOriginX !== 50) {
        newOriginX = 50;
      }
      const overflow =
        ((values.width - values.height) / 2 / values.height) * 100;
      if (newOriginY < overflow + 50) {
        newOriginY = overflow + 50;
      }
      if (newOriginY > overflow * -1 + 50) {
        newOriginY = overflow * -1 + 50;
      }
    }
    setValues({
      ...values,
      left: newLeft,
      top: newTop,
      origin: {
        x: newOriginX,
        y: newOriginY,
      },
    });
    setPreviousPosition({ x: newLeft, y: newTop });
    setPreviousOrigin({
      x: newOriginX,
      y: newOriginY,
    });
  }, [isDragging]);

  const rotateHandler = () => {
    //for orientation
    let orientation = 0;
    switch (true) {
      case values.orientation === 0:
        orientation = 90;
        break;
      case values.orientation === 90:
        orientation = 180;
        break;
      case values.orientation === 180:
        orientation = 270;
        break;
      case values.orientation === 270:
        orientation = 0;
        break;
    }
    // rotate for smooth animation
    setValues({
      ...values,
      rotate: values.rotate - 90,
      orientation,
    });
  };

  const expandHandler = () => {
    setValues({
      ...values,
      origin: { x: 50, y: 50 },
      isExpanded: values.isExpanded ? false : true,
    });
    setIsExpanded((previous) => (previous ? false : true));
  };

  return {
    photoRef,
    values,
    isDragging,
    isExpanded,
    rotateHandler,
    expandHandler,
  };
};
