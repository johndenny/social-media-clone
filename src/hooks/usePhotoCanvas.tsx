import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { AspectRatioType } from "../components/CreatePost/components/Crop";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../context/CreatePostContext";
import { globalContextType, IUrlFile } from "../context/GlobalContext";
import useGlobalContext from "./useGlobalContext";

const MAX_CANVAS_HEIGHT = 1080;
const MIN_PORTRAIT_WIDTH = 864;
const MIN_LANDSCAPE_HEIGHT = 565;

interface CanvasHandlerI {
  img: HTMLImageElement;
  photoFile: IUrlFile;
  isExport: boolean;
}

interface LoadPhotoI {
  url: string;
  index: number;
  isExport: boolean;
}

export interface CanvasResultI {
  base64: string;
  url: string;
}

type usePhotoCanvasReturnT = [loadAllPhotos: () => void, isFetching: boolean];

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const usePhotoCanvas = ({ canvasRef }: Props): usePhotoCanvasReturnT => {
  const { urlFiles } = useGlobalContext() as globalContextType;
  const {
    selectedIndex,
    selectedAspectRatio,
    currentPage,
    photosToUploadDispatch,
    photosToUploadState,
    setCurrentPage,
  } = useContext(CreatePostContext) as CreatePostContextType;
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (
      photosToUploadState.length === 0 ||
      currentPage === "details" ||
      urlFiles.length === 0
    )
      return;

    if (timerRef.current) clearTimeout(timerRef.current);
    loadPhoto({
      url: urlFiles[selectedIndex].url,
      index: selectedIndex,
      isExport: false,
    });
    timerRef.current = setTimeout(() => {
      loadPhoto({
        url: urlFiles[selectedIndex].url,
        index: selectedIndex,
        isExport: true,
      }).then((result) => {
        photosToUploadDispatch({
          type: "edit-selected",
          payload: { ...result, selectedIndex },
        });
      });
    }, 200);
  }, [selectedIndex, urlFiles, currentPage]);

  const loadAllPhotos = () => {
    setIsFetching(true);
    const filePromises = urlFiles.map((file, index) => {
      return loadPhoto({ url: file.url, index, isExport: true });
    });
    Promise.all(filePromises).then((result) => {
      photosToUploadDispatch({ type: "load-all", payload: result });
      setCurrentPage("edit");
      setIsFetching(false);
      loadPhoto({
        url: urlFiles[selectedIndex].url,
        index: selectedIndex,
        isExport: false,
      });
    });
  };

  const loadPhoto = ({ index, url, isExport }: LoadPhotoI) => {
    return new Promise<CanvasResultI>((resolve) => {
      const img = new Image();
      img.onload = () => {
        canvasHandler({ img, photoFile: urlFiles[index], isExport }).then(
          (result) => {
            resolve(result);
          }
        );
      };
      img.src = url;
    });
  };

  const canvasHandler = ({ img, photoFile, isExport }: CanvasHandlerI) => {
    return new Promise<CanvasResultI>((resolve) => {
      const canvas = canvasRef.current || document.createElement("canvas");
      const context = canvas.getContext("2d");

      const { values } = photoFile;

      const photoFileAspectRatio = values.width / values.height;
      const zoom = values.zoom / 100 + 1;
      //zoom overflow
      const zoomWidth = (values.width * zoom - values.width) / 2;
      const zoomHeight = (values.height * zoom - values.height) / 2;

      let photoWidth = 0;
      let photoHeight = 0;
      let xOffset = 0;
      let yOffset = 0;

      switch (selectedAspectRatio) {
        case "16:9":
          canvas.width = MAX_CANVAS_HEIGHT;
          canvas.height = canvas.width / (16 / 9);
          //landscape or square
          if (photoFileAspectRatio >= 1) {
            photoWidth = canvas.width;
            photoHeight = canvas.width / photoFileAspectRatio;
            if (photoHeight < canvas.height) {
              photoHeight = canvas.height;
              photoWidth = photoFileAspectRatio * canvas.height;
            }
          } else {
            //portrait
            photoWidth = MAX_CANVAS_HEIGHT;
            photoHeight = photoWidth / photoFileAspectRatio;
          }

          break;

        case "4:5":
          canvas.height = MAX_CANVAS_HEIGHT;
          canvas.width = canvas.height * (4 / 5);
          //landscape or square
          if (photoFileAspectRatio >= 1) {
            photoHeight = canvas.height;
            photoWidth = canvas.height * photoFileAspectRatio;
          } else {
            //portrait
            photoWidth = canvas.width;
            photoHeight = photoWidth / photoFileAspectRatio;
          }
          break;

        case "1:1":
          canvas.height = MAX_CANVAS_HEIGHT;
          canvas.width = MAX_CANVAS_HEIGHT;
          //landscape or square
          if (photoFileAspectRatio >= 1) {
            photoHeight = canvas.height;
            photoWidth = photoFileAspectRatio * canvas.height;
          } else {
            //portrait
            photoWidth = canvas.width;
            photoHeight = canvas.width / photoFileAspectRatio;
          }
          break;

        case "original":
          const firstAspectRatio = urlFiles[0].width / urlFiles[0].height;

          //fist photo is landscape or square
          if (firstAspectRatio >= 1) {
            canvas.width = MAX_CANVAS_HEIGHT;
            canvas.height = canvas.width / firstAspectRatio;
            if (canvas.height < MIN_LANDSCAPE_HEIGHT)
              canvas.height = MIN_LANDSCAPE_HEIGHT;

            //current photo is landscape or square
            if (photoFileAspectRatio >= 1) {
              photoWidth = canvas.width;
              photoHeight = canvas.width / photoFileAspectRatio;
              if (photoHeight < canvas.height) {
                photoHeight = canvas.height;
                photoWidth = photoFileAspectRatio * canvas.height;
              }
            }

            //current photo is portrait
            if (photoFileAspectRatio < 1) {
              photoWidth = canvas.width;
              photoHeight = canvas.width / photoFileAspectRatio;
            }
          }

          //first photo is portrait
          if (firstAspectRatio < 1) {
            canvas.height = MAX_CANVAS_HEIGHT;
            canvas.width = canvas.height * firstAspectRatio;
            if (canvas.width < MIN_PORTRAIT_WIDTH)
              canvas.width = MIN_PORTRAIT_WIDTH;

            //current photo is portrait
            if (photoFileAspectRatio < 1) {
              photoHeight = canvas.height;
              photoWidth = canvas.height * photoFileAspectRatio;
              if (photoWidth < canvas.width) {
                photoWidth = canvas.width;
                photoHeight = canvas.width / photoFileAspectRatio;
              }
            }

            //current photo is landscape or square
            if (photoFileAspectRatio >= 1) {
              photoHeight = canvas.height;
              photoWidth = canvas.height * photoFileAspectRatio;
            }
          }
          break;
        default:
          break;
      }
      //zoom overflow relative to photo
      const relativeZoomHeight =
        (zoomHeight / values.height) * (photoHeight / zoom);
      const relativeZoomWidth =
        (zoomWidth / values.width) * (photoWidth / zoom);

      //subtract zoom overflow
      xOffset =
        (values.x / values.width) * (photoWidth / zoom) - relativeZoomWidth;
      yOffset =
        (values.y / values.height) * (photoHeight / zoom) - relativeZoomHeight;

      context?.scale(zoom, zoom);

      if (!context) return;
      //converts range input to appropiate unit
      const oldRange = -100 - 100;
      const oldMin = -100;

      const halfRange = 50 - 150;
      const newMin = 50;
      const brightness =
        ((values.brightness - oldMin) * halfRange) / oldRange + newMin;

      const contrast =
        ((values.contrast - oldMin) * halfRange) / oldRange + newMin;

      const saturationRange = 0 - 200;
      const saturation =
        ((values.saturation - oldMin) * saturationRange) / oldRange + 0;

      const temperatureRange = 0 - 360;
      const temperature =
        ((values.temperature - oldMin) * temperatureRange) / oldRange + 0;

      context.filter = `saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${temperature}deg)`;

      context?.drawImage(img, xOffset, yOffset, photoWidth, photoHeight);
      if (isExport) {
        const base64 = canvas.toDataURL("image/jpeg");
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          resolve({ base64, url });
        });
      } else {
        resolve({ base64: "", url: "" });
      }
    });
  };

  return [loadAllPhotos, isFetching];
};
