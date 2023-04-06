import { useLayoutEffect, useReducer } from "react";

interface GalleryStateI {
  selectedIndex: number;
  isTransition: boolean;
  touchStartX: number;
  movementX: number;
  dragDistance: number;
  isDragging: boolean;
  isTouched: boolean;
  itemsPassed: number;
}

type GalleryStateActionI =
  | ActionNavigateI
  | ActionTouchStartI
  | ActionTouchMoveI
  | ActionTransitionI
  | ActionResetI
  | ActionDistanceI;

interface ActionNavigateI {
  type: "navigate";
  payload: { isTransition: boolean; selectedIndex: number };
}

interface ActionTouchStartI {
  type: "touch-start";
  touchStartX: number;
}

interface ActionTouchMoveI {
  type: "touch-move";
  movementX: number;
}

interface ActionTransitionI {
  type: "transition";
  isTransition: boolean;
}

interface ActionResetI {
  type: "reset" | "touched";
}

interface ActionDistanceI {
  type: "distance";
  payload: { dragDistance: number; itemsPassed: number };
}

const initialGalleryState = {
  selectedIndex: 0,
  isTransition: false,
  touchStartX: 0,
  movementX: 0,
  dragDistance: 0,
  isDragging: false,
  isTouched: false,
  itemsPassed: 0,
};

const galleryReducer = (
  state: GalleryStateI,
  action: GalleryStateActionI
): GalleryStateI => {
  const { type } = action;
  switch (type) {
    case "navigate":
      const { selectedIndex, isTransition } = action.payload;
      return isTransition
        ? {
            ...state,
            itemsPassed: 0,
            isDragging: false,
            selectedIndex,
            isTransition,
          }
        : {
            ...initialGalleryState,
            selectedIndex,
          };

    case "transition":
      return {
        ...state,
        isDragging: false,
        isTransition: action.isTransition,
      };

    case "touched":
      return {
        ...state,
        isTouched: true,
      };

    case "touch-start":
      const { touchStartX } = action;
      return {
        ...state,
        touchStartX,
      };

    case "touch-move":
      const { movementX } = action;
      return {
        ...state,
        isDragging: true,
        movementX,
      };

    case "distance":
      const { dragDistance, itemsPassed } = action.payload;

      return {
        ...state,
        itemsPassed,
        dragDistance,
      };

    case "reset":
      return { ...initialGalleryState, selectedIndex: state.selectedIndex };

    default:
      return initialGalleryState;
  }
};

interface NavigationHandlerI {
  direction: "left" | "right";
  isTransition?: boolean;
  itemsPassed: number;
}

interface Props {
  itemWidth: number;
  maxMovement: number;
  arrayLength: number;
}

type Return = [
  navigationHandler: ({ direction, isTransition }: NavigationHandlerI) => void,
  galleryState: GalleryStateI,
  galleryDispatch: React.Dispatch<GalleryStateActionI>
];

export const useGalleryNavigation = ({
  itemWidth,
  maxMovement,
  arrayLength,
}: Props): Return => {
  const [galleryState, galleryDispatch] = useReducer(
    galleryReducer,
    initialGalleryState
  );

  const {
    isDragging,
    selectedIndex,
    isTouched,
    touchStartX,
    movementX,
    isTransition,
    dragDistance,
    itemsPassed,
  } = galleryState;

  const navigationHandler = ({
    direction,
    itemsPassed,
    isTransition,
  }: NavigationHandlerI) => {
    if (
      (direction === "left" && selectedIndex === 0) ||
      (direction === "right" && selectedIndex === arrayLength)
    )
      return;

    const nextIndex =
      direction === "left"
        ? selectedIndex + itemsPassed < 0
          ? 0
          : selectedIndex + itemsPassed
        : selectedIndex + itemsPassed > arrayLength
        ? arrayLength
        : selectedIndex + itemsPassed;
    galleryDispatch({
      type: "navigate",
      payload: {
        isTransition: Boolean(isTransition),
        selectedIndex: nextIndex,
      },
    });
  };

  useLayoutEffect(() => {
    document.addEventListener("touchstart", startHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("touchend", endHandler);
    return () => {
      document.removeEventListener("touchend", endHandler);
      document.removeEventListener("touchstart", startHandler);
      document.removeEventListener("touchmove", moveHandler);
    };
  }, [isTouched, touchStartX, movementX, isTransition, itemsPassed]);

  const startHandler = (e: TouchEvent) => {
    galleryDispatch({ type: "touch-start", touchStartX: e.touches[0].clientX });
  };

  const moveHandler = (e: TouchEvent) => {
    if (!isTouched || isTransition) return;
    galleryDispatch({ type: "touch-move", movementX: e.touches[0].clientX });
  };

  const endHandler = (e: TouchEvent) => {
    if (!isDragging) return;

    const isTransition = dragDistance > 0 && dragDistance < maxMovement;

    if (itemsPassed > 0) {
      navigationHandler({ direction: "right", isTransition, itemsPassed });
      return;
    }

    if (itemsPassed < 0) {
      navigationHandler({ direction: "left", isTransition, itemsPassed });
      return;
    }

    galleryDispatch({ type: "transition", isTransition });
  };

  useLayoutEffect(() => {
    if (!isDragging || touchStartX === null) return;

    const nextphotoTrigger = itemWidth / 6;
    const difference = touchStartX - movementX;

    let itemsPassed =
      difference > 0
        ? Math.floor((itemWidth + difference - nextphotoTrigger) / itemWidth)
        : Math.ceil((difference - itemWidth + nextphotoTrigger) / itemWidth);

    let movement = touchStartX - movementX;
    let totalMovement = movement + selectedIndex * itemWidth;

    if (totalMovement < 0) totalMovement = 0;
    if (totalMovement > maxMovement) totalMovement = maxMovement;
    if (totalMovement === 0 || totalMovement === maxMovement) itemsPassed = 0;

    galleryDispatch({
      type: "distance",
      payload: { dragDistance: totalMovement, itemsPassed },
    });
  }, [movementX]);

  return [navigationHandler, galleryState, galleryDispatch];
};
