import { IUrlFile } from "../context/GlobalContext";

export const useProfilePhotoCanvas = (imageDetails: IUrlFile) => {
  const loadPhoto = () => {
    return new Promise<{ base64: string }>((resolve) => {
      const img = new Image();
      img.onload = () => {
        canvasHandler(img).then((result) => resolve(result));
      };
      img.src = imageDetails.url;
    });
  };

  const canvasHandler = (img: HTMLImageElement) => {
    return new Promise<{ base64: string }>((resolve) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.height = 320;
      canvas.width = 320;

      const aspectRatio = img.width / img.height;

      let imageWidth;
      let imageHeight;
      let xOffset;
      let yOffset;

      //landscape/square
      if (aspectRatio >= 1) {
        imageHeight = canvas.height;
        imageWidth = aspectRatio * imageHeight;
        xOffset = (imageHeight - imageWidth) / 2;
        yOffset = 0;
      } else {
        //portrait
        imageWidth = canvas.width;
        imageHeight = imageWidth / aspectRatio;
        yOffset = (imageWidth - imageHeight) / 2;
        xOffset = 0;
      }

      context?.drawImage(img, xOffset, yOffset, imageWidth, imageHeight);

      const base64 = canvas.toDataURL("image/jpeg");

      resolve({ base64 });
    });
  };

  return { loadPhoto };
};
