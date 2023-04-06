import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../context/CreatePostContext";
import { globalContextType, IUrlFile } from "../context/GlobalContext";
import useGlobalContext from "./useGlobalContext";
import { initPhotoMovementValues } from "./usePhotoMovement";

export default function useImageUpload() {
  const { setUrlFiles, urlFiles, isMobile } =
    useGlobalContext() as globalContextType;
  const createPostContext = useContext(
    CreatePostContext
  ) as CreatePostContextType;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [type, setType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if (!selectedFile) {
    //   return setUrlFile(undefined);
    // }
    if (selectedFiles.length === 0) return;
    const promiseArray = selectedFiles.map((file) => {
      const objectURL = URL.createObjectURL(file);
      return getAspectRatio(objectURL, type);
    });

    Promise.all(promiseArray).then((result) => {
      if (urlFiles.length > 10) return;
      if (urlFiles.length !== 0) {
        const maxFiles = 10 - urlFiles.length;

        if ([...urlFiles, ...result].length > 10) {
          createPostContext.setFileOverflow(result.length - maxFiles);
          return setUrlFiles([...urlFiles, ...result.slice(0, maxFiles)]);
        }

        setUrlFiles([...urlFiles, ...result]);
      } else {
        const maxFiles = 10 - urlFiles.length;

        if (result.length > 10) {
          createPostContext.setFileOverflow(result.length - maxFiles);
          return setUrlFiles(result.slice(0, maxFiles));
        }
        setUrlFiles(result);
      }
      setSelectedFiles([]);
      if (isMobile) navigate("/create/style");
    });

    return () => {
      // URL.revokeObjectURL(objectURL);
    };
  }, [selectedFiles]);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setType("");
      return setSelectedFiles([]);
    }
    setType(e.target.name);
    setSelectedFiles(
      Array.from(e.target.files).map((file) => {
        return file;
      })
    );
  };

  return { fileChangeHandler, setSelectedFiles, setType };
}

export function getAspectRatio(url: string, type: string) {
  const image = new Image();

  const promise = new Promise<IUrlFile>((resolve, reject) => {
    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;

      resolve({
        width,
        height,
        url,
        type,
        values: initPhotoMovementValues,
      });
    };
    image.onerror = reject;
  });
  image.src = url;
  return promise;
}
