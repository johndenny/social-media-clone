import React, { useContext } from "react";
import { Button } from "../styled";
import { ReactComponent as ChevronLeftSvg } from "../../../../../assets/svgs/chevronLeft.svg";
import { ReactComponent as ChevronRightSvg } from "../../../../../assets/svgs/chevronRight.svg";
import { ButtonPosition, Container } from "./styled";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../../context/GlobalContext";
import { IndicatorContainer } from "./styled/IndicatorContainer";
import { StepIndicator } from "./styled/StepIndicator";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../context/CreatePostContext";

interface Props {}

type nextPhotoType = {
  direction: "left" | "right";
};

export const NavigationButtons: React.FC<Props> = () => {
  const { urlFiles } = useGlobalContext() as globalContextType;
  const { selectedIndex, setSelectedIndex } = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const nextPhotoHandler = ({ direction }: nextPhotoType) => {
    setSelectedIndex((prevState) => {
      const newIndex = direction === "left" ? prevState - 1 : prevState + 1;
      return newIndex;
    });
  };

  if (urlFiles.length === 1) return null;

  return (
    <Container>
      {selectedIndex !== 0 && (
        <ButtonPosition left>
          <Button onClick={() => nextPhotoHandler({ direction: "left" })}>
            <ChevronLeftSvg />
          </Button>
        </ButtonPosition>
      )}
      {selectedIndex !== urlFiles.length - 1 && (
        <ButtonPosition right>
          <Button onClick={() => nextPhotoHandler({ direction: "right" })}>
            <ChevronRightSvg />
          </Button>
        </ButtonPosition>
      )}
      <IndicatorContainer>
        {urlFiles.map((file, index) => {
          return (
            <StepIndicator
              key={file.url}
              selected={selectedIndex === index}
            ></StepIndicator>
          );
        })}
      </IndicatorContainer>
    </Container>
  );
};
