import {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from "react";
import { AspectRatioType } from "../components/CreatePost/components/Crop";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../context/CreatePostContext";
import { globalContextType, IUrlFile } from "../context/GlobalContext";
import useGlobalContext from "./useGlobalContext";
import { Filters } from "./useMobilePhotoCanvas";
import useWindowSize from "./useWindowSize";

const MIN_PORTRAIT_RATIO = 4 / 5;
const MIN_LANDSCAPE_RATIO = 1.91 / 1;

export interface MovementStateI {
  isMouseDown: boolean;
  isMouseMove: boolean;
  start: MovementI;
  movement: MovementI;
  previousLocation: MovementI;
}

export type MovementActionI =
  | MovementActionMouseDownI
  | MovementActionMouseMoveI
  | MovementActionMouseUpI
  | MovementActionLocationI;

interface MovementActionMouseMoveI {
  type: "mouse-move";
  payload: MovementI;
}

interface MovementActionMouseUpI {
  type: "mouse-up";
}

interface MovementActionMouseDownI {
  type: "mouse-down";
  payload: { xy: MovementI; prevXY: MovementI };
}

interface MovementActionLocationI {
  type: "adjustments";
  payload: MovementI;
}

const initMovementState = {
  isMouseDown: false,
  isMouseMove: false,
  start: { x: 0, y: 0 },
  movement: { x: 0, y: 0 },
  previousLocation: { x: 0, y: 0 },
};

function MovementReducer(state: MovementStateI, action: MovementActionI) {
  const { type } = action;
  switch (type) {
    case "mouse-down":
      return {
        ...state,
        isMouseDown: true,
        start: action.payload.xy,
        previousLocation: action.payload.prevXY,
      };

    case "mouse-move":
      return {
        ...state,
        isMouseMove: true,
        movement: action.payload,
      };

    case "adjustments":
      return {
        ...state,
        movement: action.payload,
        previousLocation: action.payload,
      };

    case "mouse-up":
      return initMovementState;

    default:
      return initMovementState;
  }
}

export type PhotoMovementValuesType = {
  frameHeight: number;
  frameWidth: number;
  height: number;
  width: number;
  x: number;
  y: number;
  zoom: number;
  filter: Filters;
  brightness: number;
  contrast: number;
  saturation: number;
  temperature: number;
};

interface MovementI {
  x: number;
  y: number;
}

export const initPhotoMovementValues = {
  frameHeight: 0,
  frameWidth: 0,
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  zoom: 0,
  filter: "normal" as Filters,
  brightness: 0,
  contrast: 0,
  saturation: 0,
  temperature: 100,
};

interface SetValueI {
  values: PhotoMovementValuesType;
  index: number;
}

interface Props {
  windowHeight?: number;
  selectedFile: IUrlFile;
  selectedIndex: number;
  selectedAspectRatio: AspectRatioType;
}

type PhotoMovementReturnType = [
  handleZoom: (e: ChangeEvent<HTMLInputElement>) => void,
  photoRef: React.MutableRefObject<HTMLDivElement | null>,
  isMouseMove: boolean
];

export const usePhotoMovement = ({
  windowHeight,
  selectedFile,
  selectedAspectRatio,
  selectedIndex,
}: Props): PhotoMovementReturnType => {
  const { width, height } = useWindowSize();
  const { urlFiles, setUrlFiles } = useGlobalContext() as globalContextType;
  const [movementState, movementDispatch] = useReducer(
    MovementReducer,
    initMovementState
  );
  const { isMouseDown, isMouseMove, movement, previousLocation, start } =
    movementState;
  const photoRef = useRef<HTMLDivElement | null>(null);

  const setValues = ({ values, index }: SetValueI) => {
    const newUrlFiles = [...urlFiles];
    newUrlFiles[index].values = values;
    setUrlFiles(newUrlFiles);
  };

  // resizes photos based off first photo in array and ratio selection
  const squareAspectRatioHandler = (index: number) => {
    if (!windowHeight) return;

    const { width, height } = urlFiles[index];
    const aspectRatio = width / height;
    let newHeight = 0;
    let newWidth = 0;
    let x = 0;
    let y = 0;

    //landscape or square
    if (aspectRatio >= 1) {
      newHeight = windowHeight;
      newWidth = aspectRatio * newHeight;
      x = (newHeight - newWidth) / 2;
    } else {
      //portrait
      newWidth = windowHeight;
      newHeight = newWidth / aspectRatio;
      y = (newWidth - newHeight) / 2;
    }
    setValues({
      values: {
        ...urlFiles[index].values,
        frameHeight: windowHeight,
        frameWidth: windowHeight,
        x,
        y,
        height: newHeight,
        width: newWidth,
      },
      index,
    });
  };

  const originalAspectRatioHandler = (index: number) => {
    if (!windowHeight) return;

    const selectedAspectRatio = urlFiles[0].width / urlFiles[0].height;
    const aspectRatio = urlFiles[index].width / urlFiles[index].height;

    const minLandscapeHeight = windowHeight / MIN_LANDSCAPE_RATIO;
    const minPortraitWidth = MIN_PORTRAIT_RATIO * windowHeight;

    let frameWidth = windowHeight;
    let frameHeight = windowHeight;
    let height = 0;
    let width = 0;
    let x = 0;
    let y = 0;

    //first photo is landscape or square
    if (selectedAspectRatio >= 1) {
      frameHeight = windowHeight / selectedAspectRatio;
      if (frameHeight < minLandscapeHeight) frameHeight = minLandscapeHeight;

      // current aspect ratio is landscape or square
      if (aspectRatio >= 1) {
        width = windowHeight;
        height = width / aspectRatio;
        if (height < frameHeight) {
          height = frameHeight;
          width = aspectRatio * frameHeight;
        }
        x = (frameWidth - width) / 2;
      }

      // current aspect ratio is portrait
      if (aspectRatio < 1) {
        width = windowHeight;
        height = width / aspectRatio;
        y = (frameHeight - height) / 2;
      }
    }

    // first photo is portrait
    if (selectedAspectRatio < 1) {
      frameWidth = windowHeight * selectedAspectRatio;
      if (frameWidth < minPortraitWidth) frameWidth = minPortraitWidth;

      // current aspect ratio is portrait
      if (aspectRatio < 1) {
        height = windowHeight;
        width = height * aspectRatio;

        if (width < frameWidth) {
          width = frameWidth;
          height = frameWidth / aspectRatio;
        }
        y = (frameHeight - height) / 2;
      }

      //current aspect ratio is landscape or square
      if (aspectRatio >= 1) {
        height = windowHeight;
        width = height * aspectRatio;
        x = (frameWidth - width) / 2;
      }
    }

    setValues({
      values: {
        ...urlFiles[index].values,
        frameHeight,
        frameWidth,
        height,
        width,
        x,
        y,
      },
      index,
    });
  };

  const fourFiveAspectRatioHandler = (index: number) => {
    if (!windowHeight) return;

    const selectedAspectRatio = 4 / 5;
    const aspectRatio = urlFiles[index].width / urlFiles[index].height;

    let frameWidth = windowHeight;
    let frameHeight = windowHeight;
    let height = 0;
    let width = 0;
    let x = 0;
    let y = 0;

    //landscape or square
    if (aspectRatio >= 1) {
      height = windowHeight;
      frameWidth = height * selectedAspectRatio;
      width = height * aspectRatio;
      x = (frameWidth - width) / 2;
    } else {
      //portrait
      width = windowHeight * selectedAspectRatio;
      height = width / aspectRatio;
      frameWidth = windowHeight * selectedAspectRatio;
      y = (frameHeight - height) / 2;
    }

    setValues({
      values: {
        ...urlFiles[index].values,
        frameHeight,
        frameWidth,
        height,
        width,
        x,
        y,
      },
      index,
    });
  };

  const sixteenNineAspectRatioHandler = (index: number) => {
    if (!windowHeight) return;

    const selectedAspectRatio = 16 / 9;
    const aspectRatio = urlFiles[index].width / urlFiles[index].height;

    let frameWidth = windowHeight;
    let frameHeight = windowHeight;
    let height = 0;
    let width = 0;
    let x = 0;
    let y = 0;

    //landscape or square
    if (aspectRatio >= 1) {
      width = windowHeight;
      frameHeight = width / selectedAspectRatio;
      height = width / aspectRatio;
      if (height < frameHeight) {
        height = frameHeight;
        width = aspectRatio * frameHeight;
      }
      x = (frameWidth - width) / 2;
      y = (frameHeight - height) / 2;
    } else {
      //portrait
      width = windowHeight;
      frameHeight = width / selectedAspectRatio;
      height = width / aspectRatio;
      y = (frameHeight - height) / 2;
    }

    setValues({
      values: {
        ...urlFiles[index].values,
        frameHeight,
        frameWidth,
        height,
        width,
        x,
        y,
      },
      index,
    });
  };

  useLayoutEffect(() => {
    urlFiles.forEach((_, index) => {
      switch (selectedAspectRatio) {
        case "1:1":
          squareAspectRatioHandler(index);
          break;
        case "original":
          originalAspectRatioHandler(index);
          break;
        case "4:5":
          fourFiveAspectRatioHandler(index);
          break;
        case "16:9":
          sixteenNineAspectRatioHandler(index);
          break;
        default:
          break;
      }
    });
  }, [selectedAspectRatio, width, height]);

  useLayoutEffect(() => {
    //if last files width has been calculated when file added.
    if (urlFiles[urlFiles.length - 1].values.width !== 0) return;

    switch (selectedAspectRatio) {
      case "1:1":
        squareAspectRatioHandler(urlFiles.length - 1);
        break;
      case "original":
        originalAspectRatioHandler(urlFiles.length - 1);
        break;
      case "4:5":
        fourFiveAspectRatioHandler(urlFiles.length - 1);
        break;
      case "16:9":
        sixteenNineAspectRatioHandler(urlFiles.length - 1);
        break;
      default:
        break;
    }
  }, [urlFiles.length]);

  const mouseDownHandler = (e: MouseEvent) => {
    if (e.target !== photoRef.current || selectedIndex === undefined) return;
    //cursor location
    const xy = { x: e.clientX, y: e.clientY };
    //file location
    const { x, y } = urlFiles[selectedIndex].values;
    const prevXY = { x, y };

    movementDispatch({ type: "mouse-down", payload: { xy, prevXY } });
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isMouseDown) return;
    const payload = { x: e.clientX, y: e.clientY };
    movementDispatch({ type: "mouse-move", payload });
  };

  const mouseUpHandler = (e: MouseEvent) => {
    movementDispatch({ type: "mouse-up" });
  };

  useEffect(() => {
    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [isMouseDown, selectedFile]);

  useEffect(() => {
    // calculates distance mouse moves from mouse down location. adds previous locaiton.
    if (!isMouseDown || selectedIndex === undefined) return;

    const x = movement.x - start.x + previousLocation.x;
    const y = movement.y - start.y + previousLocation.y;
    setValues({
      values: { ...urlFiles[selectedIndex].values, x, y },
      index: selectedIndex,
    });
  }, [movement]);

  useLayoutEffect(() => {
    //resets movement to stay within bounds of photo dimensions
    if (isMouseMove || !windowHeight) return;

    const { values } = selectedFile;
    let x = values.x;
    let y = values.y;
    const zoom = values.zoom / 100 + 1;
    const zoomWidth = (values.width * zoom - values.width) / 2;
    const zoomHeight = (values.height * zoom - values.height) / 2;

    const startOverflowX = 0 + zoomWidth;
    if (x > startOverflowX) x = startOverflowX;

    const startOverflowY = 0 + zoomHeight;
    if (y > startOverflowY) y = startOverflowY;

    const endOverflowX = values.frameWidth - values.width - zoomWidth;
    if (x < endOverflowX) x = endOverflowX;

    const endOverflowY = values.frameHeight - values.height - zoomHeight;
    if (y < endOverflowY) y = endOverflowY;

    setValues({
      values: { ...urlFiles[selectedIndex].values, x, y },
      index: selectedIndex,
    });
  }, [isMouseMove, selectedFile.values.zoom]);

  const handleZoom = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      values: {
        ...urlFiles[selectedIndex].values,
        zoom: Number(e.currentTarget.value),
      },
      index: selectedIndex,
    });
  };

  return [handleZoom, photoRef, isMouseMove];
};
