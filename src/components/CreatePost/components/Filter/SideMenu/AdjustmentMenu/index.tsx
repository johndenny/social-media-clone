import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../../context/CreatePostContext";
import { globalContextType } from "../../../../../../context/GlobalContext";
import useGlobalContext from "../../../../../../hooks/useGlobalContext";
import { Filters } from "../../../../../../hooks/useMobilePhotoCanvas";
import {
  Container,
  RangeContainer,
  RangeInput,
  RangeNumber,
  RangeTitle,
  ResetButton,
} from "./styled";

type RangeT = "brightness" | "contrast" | "saturation" | "temperature";

interface Props {}

export const AdjustmentMenu: React.FC<Props> = () => {
  const { urlFiles, setUrlFiles } = useGlobalContext() as globalContextType;
  const { selectedIndex, resetValues } = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const rangeTimerRef = useRef<number | null>(null);
  const { values } = urlFiles[selectedIndex];

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    rangeType: RangeT
  ) => {
    const number = Number(e.currentTarget.value);
    const newFiles = [...urlFiles];
    let newValues = { ...values, filter: "custom" as Filters };
    switch (rangeType) {
      case "brightness":
        newValues = { ...newValues, brightness: number };
        break;

      case "contrast":
        newValues = { ...newValues, contrast: number };
        break;

      case "saturation":
        newValues = { ...newValues, saturation: number };
        break;

      case "temperature":
        newValues = { ...newValues, temperature: number };
        break;

      default:
        break;
    }

    if (
      resetValues.brightness === newValues.brightness &&
      resetValues.contrast === newValues.contrast &&
      resetValues.saturation === newValues.saturation &&
      resetValues.temperature === newValues.temperature
    )
      newValues = { ...newValues, filter: resetValues.filter };

    newFiles.splice(selectedIndex, 1);
    newFiles.splice(selectedIndex, 0, {
      ...urlFiles[selectedIndex],
      values: newValues,
    });
    setUrlFiles(newFiles);
  };

  const resetHandler = (rangeType: RangeT) => {
    const newFiles = [...urlFiles];
    let newValues = { ...values };
    const { brightness, contrast, saturation, temperature } = resetValues;
    switch (rangeType) {
      case "brightness":
        newValues = { ...newValues, brightness };
        break;
      case "contrast":
        newValues = { ...newValues, contrast };
        break;
      case "saturation":
        newValues = { ...newValues, saturation };
        break;
      case "temperature":
        newValues = { ...newValues, temperature };
        break;
      default:
        break;
    }

    if (
      resetValues.brightness === newValues.brightness &&
      resetValues.contrast === newValues.contrast &&
      resetValues.saturation === newValues.saturation &&
      resetValues.temperature === newValues.temperature
    )
      newValues = { ...newValues, filter: resetValues.filter };

    newFiles.splice(selectedIndex, 1);
    newFiles.splice(selectedIndex, 0, {
      ...urlFiles[selectedIndex],
      values: newValues,
    });
    setUrlFiles(newFiles);
  };

  return (
    <>
      <Container isZero={values.brightness === resetValues.brightness}>
        <RangeTitle>
          <h2>Brightness</h2>
          <ResetButton onClick={() => resetHandler("brightness")}>
            Reset
          </ResetButton>
        </RangeTitle>
        <RangeContainer>
          <RangeInput
            style={{
              backgroundImage: `linear-gradient(to right, 
              rgb(219, 219, 219) 0%, 
              rgb(219, 219, 219) ${
                values.brightness > 0 ? 50 : 50 + values.brightness / 2
              }%, 
              rgb(38, 38, 38) ${
                values.brightness > 0 ? 50 : 50 + values.brightness / 2
              }%, 
              rgb(38, 38, 38) ${
                values.brightness < 0 ? 50 : 50 + values.brightness / 2
              }%, 
              rgb(219, 219, 219) ${
                values.brightness < 0 ? 50 : 50 + values.brightness / 2
              }%, 
              rgb(219, 219, 219) 100%)`,
            }}
            type={"range"}
            min={-100}
            max={100}
            onChange={(e) => changeHandler(e, "brightness")}
            value={values.brightness}
          />
          <RangeNumber>{values.brightness}</RangeNumber>
        </RangeContainer>
      </Container>

      <Container isZero={values.contrast === resetValues.contrast}>
        <RangeTitle>
          <h2>Contrast</h2>
          <ResetButton onClick={() => resetHandler("contrast")}>
            Reset
          </ResetButton>
        </RangeTitle>
        <RangeContainer>
          <RangeInput
            style={{
              backgroundImage: `linear-gradient(to right, 
              rgb(219, 219, 219) 0%, 
              rgb(219, 219, 219) ${
                values.contrast > 0 ? 50 : 50 + values.contrast / 2
              }%, 
              rgb(38, 38, 38) ${
                values.contrast > 0 ? 50 : 50 + values.contrast / 2
              }%, 
              rgb(38, 38, 38) ${
                values.contrast < 0 ? 50 : 50 + values.contrast / 2
              }%, 
              rgb(219, 219, 219) ${
                values.contrast < 0 ? 50 : 50 + values.contrast / 2
              }%, 
              rgb(219, 219, 219) 100%)`,
            }}
            type={"range"}
            min={-100}
            max={100}
            onChange={(e) => changeHandler(e, "contrast")}
            value={values.contrast}
          />
          <RangeNumber>{values.contrast}</RangeNumber>
        </RangeContainer>
      </Container>

      <Container isZero={values.saturation === resetValues.saturation}>
        <RangeTitle>
          <h2>Saturation</h2>
          <ResetButton onClick={() => resetHandler("saturation")}>
            Reset
          </ResetButton>
        </RangeTitle>
        <RangeContainer>
          <RangeInput
            style={{
              backgroundImage: `linear-gradient(to right, 
              rgb(219, 219, 219) 0%, 
              rgb(219, 219, 219) ${
                values.saturation > 0 ? 50 : 50 + values.saturation / 2
              }%, 
              rgb(38, 38, 38) ${
                values.saturation > 0 ? 50 : 50 + values.saturation / 2
              }%, 
              rgb(38, 38, 38) ${
                values.saturation < 0 ? 50 : 50 + values.saturation / 2
              }%, 
              rgb(219, 219, 219) ${
                values.saturation < 0 ? 50 : 50 + values.saturation / 2
              }%, 
              rgb(219, 219, 219) 100%)`,
            }}
            type={"range"}
            min={-100}
            max={100}
            onChange={(e) => changeHandler(e, "saturation")}
            value={values.saturation}
          />
          <RangeNumber>{values.saturation}</RangeNumber>
        </RangeContainer>
      </Container>

      <Container isZero={values.temperature === resetValues.temperature}>
        <RangeTitle>
          <h2>Temperature</h2>
          <ResetButton onClick={() => resetHandler("temperature")}>
            Reset
          </ResetButton>
        </RangeTitle>
        <RangeContainer>
          <RangeInput
            style={{
              backgroundImage: `linear-gradient(to right, 
              rgb(219, 219, 219) 0%, 
              rgb(219, 219, 219) ${
                values.temperature > 0 ? 50 : 50 + values.temperature / 2
              }%, 
              rgb(38, 38, 38) ${
                values.temperature > 0 ? 50 : 50 + values.temperature / 2
              }%, 
              rgb(38, 38, 38) ${
                values.temperature < 0 ? 50 : 50 + values.temperature / 2
              }%, 
              rgb(219, 219, 219) ${
                values.temperature < 0 ? 50 : 50 + values.temperature / 2
              }%, 
              rgb(219, 219, 219) 100%)`,
            }}
            type={"range"}
            min={-100}
            max={100}
            onChange={(e) => changeHandler(e, "temperature")}
            value={values.temperature}
          />
          <RangeNumber>{values.temperature}</RangeNumber>
        </RangeContainer>
      </Container>
    </>
  );
};
