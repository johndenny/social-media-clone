import { RefObject, useEffect, useState } from "react";
import { ImageValues } from "./useMobilePhotoMovement";
import {
  globalContextType,
  ImageToUploadI,
  IUrlFile,
} from "../context/GlobalContext";
import useGlobalContext from "./useGlobalContext";
import { useLocation } from "react-router-dom";

const MAX_CANVAS_HEIGHT = 1080;
const MIN_PORTRAIT_WIDTH = 864;
const MIN_LANDSCAPE_HEIGHT = 565;

export type Filters =
  | "custom"
  | "normal"
  | "clarendon"
  | "gingham"
  | "moon"
  | "lark"
  | "reyes"
  | "juno"
  | "slumber"
  | "crema"
  | "aden"
  | "ludwig"
  | "perpetua";

export const useMobilePhotoCanvas = (
  imageDetails: IUrlFile,
  canvasRef: RefObject<HTMLCanvasElement>,
  values: ImageValues
) => {
  const location = useLocation();
  const { setImageToUpload } = useGlobalContext() as globalContextType;
  const [selectedFilter, setSelectedFilter] = useState<Filters>("normal");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    loadImage().then((result) => {
      setImageToUpload(result);
    });
  }, [values, imageDetails, selectedFilter, location]);

  const loadImageWithFetch = () => {
    setIsFetching(true);
    return new Promise<ImageToUploadI>((resolve) => {
      loadImage().then((result) => {
        setIsFetching(false);
        setImageToUpload(result);
        resolve(result);
      });
    });
  };

  const loadImage = () => {
    return new Promise<ImageToUploadI>((resolve) => {
      const img = new Image();
      img.onload = () => {
        canvasHandler(img).then((result) => {
          resolve(result);
        });
      };
      img.src = imageDetails.url;
    });
  };

  const canvasHandler = (img: HTMLImageElement) => {
    return new Promise<{ base64: string; url: string }>((resolve) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = MAX_CANVAS_HEIGHT;
      canvas.height = MAX_CANVAS_HEIGHT;

      //converting to percent of MAX_CANVAS_HEIGHT
      let xOffset = (values.left / 100) * MAX_CANVAS_HEIGHT;
      let yOffset = (values.top / 100) * MAX_CANVAS_HEIGHT;
      const imageWidth = (values.width / 100) * MAX_CANVAS_HEIGHT;
      const imageHeight = (values.height / 100) * MAX_CANVAS_HEIGHT;

      if (values.isExpanded) {
        if (imageHeight <= MAX_CANVAS_HEIGHT) yOffset = 0;
        if (imageWidth <= MAX_CANVAS_HEIGHT) xOffset = 0;
        //checks for overflow handling
        if (imageHeight > MAX_CANVAS_HEIGHT) {
          //toggles landcape or portrait values when orientation changes
          if (values.orientation === 90 || values.orientation === 270) {
            canvas.height = MIN_LANDSCAPE_HEIGHT;
            canvas.width = MAX_CANVAS_HEIGHT;
          } else {
            canvas.width = MIN_PORTRAIT_WIDTH;
            canvas.height = MAX_CANVAS_HEIGHT;
          }
        } else if (imageWidth > MAX_CANVAS_HEIGHT) {
          if (values.orientation === 90 || values.orientation === 270) {
            canvas.height = MAX_CANVAS_HEIGHT;
            canvas.width = MIN_PORTRAIT_WIDTH;
          } else {
            canvas.width = MAX_CANVAS_HEIGHT;
            canvas.height = MIN_LANDSCAPE_HEIGHT;
          }
        } else {
          if (values.orientation === 90 || values.orientation === 270) {
            canvas.height = imageWidth;
            canvas.width = imageHeight;
          } else {
            canvas.width = imageWidth;
            canvas.height = imageHeight;
          }
        }
      }

      //matches transform-origin
      let translateX = 0;
      let translateY = 0;
      if (values.orientation === 90) {
        translateY = canvas.height;
      }
      if (values.orientation === 180) {
        translateX = canvas.width;
        translateY = canvas.height;
      }
      if (values.orientation === 270) {
        translateX = canvas.width;
      }
      ctx?.translate(translateX, translateY);
      ctx?.rotate((values.rotate * Math.PI) / 180);

      if (!ctx) return;
      switch (true) {
        case selectedFilter === "moon":
          ctx.filter = "grayscale(100%) brightness(125%)";
          break;
        case selectedFilter === "clarendon":
          ctx.filter =
            "saturate(130%) brightness(115%) contrast(120%) hue-rotate(5deg)";
          break;
        case selectedFilter === "gingham":
          ctx.filter = "contrast(75%) saturate(90%) brightness(115%)";
          break;
        case selectedFilter === "lark":
          ctx.filter = "saturate(115%) brightness(110%) hue-rotate(5deg)";
          break;
        case selectedFilter === "reyes":
          ctx.filter =
            "contrast(50%) saturate(75%) brightness(125%) hue-rotate(355deg)";
          break;
        case selectedFilter === "juno":
          ctx.filter = "contrast(90%) hue-rotate(10deg) brightness(110%)";
          break;
        case selectedFilter === "slumber":
          ctx.filter = "brightness(80%) hue-rotate(350deg) saturate(125%)";
          break;
        case selectedFilter === "crema":
          ctx.filter = "brightness(85%) hue-rotate(5deg) saturate(90%)";
          break;
        case selectedFilter === "ludwig":
          ctx.filter = "hue-rotate(355deg) saturate(125%)";
          break;
        case selectedFilter === "aden":
          ctx.filter = "sepia(50%) saturate(150%)";
          break;
        case selectedFilter === "perpetua":
          ctx.filter = "brightness(80%) saturate(130%)";
          break;
        default:
      }

      ctx?.drawImage(img, xOffset, yOffset, imageWidth, imageHeight);
      const base64 = canvas.toDataURL("image/jpeg");
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        resolve({ base64, url });
      });
    });
  };

  return [selectedFilter, setSelectedFilter, loadImageWithFetch, isFetching];
};
