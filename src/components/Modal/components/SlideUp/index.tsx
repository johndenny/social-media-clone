import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import useWindowSize from "../../../../hooks/useWindowSize";
import { ReactComponent as PlusSvg } from "../../../../assets/svgs/plus.svg";
import { ReactComponent as ChevronSvg } from "../../../../assets/svgs/chevron.svg";
import {
  BackDropSlideUp,
  Container,
  Header,
  Line,
  LineContainer,
  ContentContainer,
  Title,
  TitleContainer,
  Spacer,
  Button,
  ButtonText,
} from "./styled";
import { Spinner } from "../../../Spinner";

//text + line + border-bottom
const HEADER = 50 + 28 + 1;

interface Props {
  title: string;
  leftButton?: "back-chevron";
  leftOnClick?: () => void;
  rightButton?: "plus" | "save" | "fetching";
  rightOnClick?: () => void;
  contentHeight: number;
  children?: React.ReactNode;
  isCollection?: boolean;
}

export const SlideUp: React.FC<Props> = ({
  title,
  rightButton,
  leftButton,
  leftOnClick,
  rightOnClick,
  contentHeight,
  children,
  isCollection,
}) => {
  const { height } = useWindowSize();
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  const listRef = useRef<HTMLDivElement | null>(null);
  const [selectedListHeight, setSelectedListHeight] = useState(contentHeight);
  const [listHeight, setListHeight] = useState(contentHeight);
  const [listTransform, setListTransform] = useState(window.innerHeight);
  const [isClosing, setIsClosing] = useState(false);
  const [yStart, setYstart] = useState(0);
  const [yMovement, setYMovement] = useState(0);
  const [isTouched, setIsTouched] = useState(false);
  const movement = yStart - yMovement;

  useLayoutEffect(() => {
    if (isTouched) return;
    let newSelectedListHeight = contentHeight;

    if (isCollection) {
      setListHeight(newSelectedListHeight);
      setListTransform(window.innerHeight - (newSelectedListHeight + HEADER));
      return;
    }

    if (listHeight < height / 6) return transitionModal();

    if (listHeight < selectedListHeight && listHeight < height - HEADER) {
      newSelectedListHeight = contentHeight;
      setSelectedListHeight(newSelectedListHeight);
    }

    if (listHeight + HEADER > height - height / 6) {
      newSelectedListHeight = height - HEADER;
      setSelectedListHeight(newSelectedListHeight);
    }

    setListHeight(newSelectedListHeight);
    setListTransform(window.innerHeight - (newSelectedListHeight + HEADER));
  }, [isTouched, height]);

  const transitionModal = () => {
    setIsClosing(true);
    setListTransform(window.innerHeight);
  };

  const transitionEndHandler = () => {
    if (isClosing) setModalAttrs(null);
  };

  const touchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouched(true);
    setYstart(e.touches[0].clientY);
  };

  const touchMoveHandler = (e: TouchEvent) => {
    setYMovement(e.touches[0].clientY);
  };

  const touchEndHandler = () => {
    setIsTouched(false);
  };

  useEffect(() => {
    if (isTouched) {
      let newMovement = movement;

      if (isCollection) {
        if (movement > 0) newMovement = movement / 8;
      }

      setListTransform(
        window.innerHeight - (selectedListHeight + HEADER + newMovement)
      );
      setListHeight(selectedListHeight + newMovement);
    }
  }, [yMovement]);

  useEffect(() => {
    if (!isTouched) return;
    document.addEventListener("touchmove", touchMoveHandler);
    document.addEventListener("touchend", touchEndHandler);
    return () => {
      document.removeEventListener("touchmove", touchMoveHandler);
      document.removeEventListener("touchend", touchEndHandler);
    };
  }, [isTouched]);

  return (
    <BackDropSlideUp onClick={transitionModal}>
      <Container
        onTouchStart={touchStartHandler}
        transformY={listTransform}
        transition={!isTouched}
        onTransitionEnd={transitionEndHandler}
      >
        <Header onClick={(e) => e.stopPropagation()}>
          <LineContainer>
            <Line></Line>
          </LineContainer>
          <TitleContainer>
            <Spacer onClick={leftOnClick} left>
              <div style={{ transform: "rotate(-90deg)" }}>
                {leftButton === "back-chevron" && <ChevronSvg />}
              </div>
            </Spacer>

            <Title>{title}</Title>
            <Spacer>
              <Button onClick={rightOnClick} disabled={!Boolean(rightOnClick)}>
                {rightButton === "plus" && (
                  <PlusSvg fill="rgb(var(--primary-text))" />
                )}
                {rightButton === "save" && <ButtonText>Save</ButtonText>}
                {rightButton === "fetching" && <Spinner size="small" />}
              </Button>
            </Spacer>
          </TitleContainer>
        </Header>
        <ContentContainer
          onClick={(e) => e.stopPropagation()}
          ref={listRef}
          height={listHeight}
          transition={!isTouched}
        >
          {children}
        </ContentContainer>
      </Container>
    </BackDropSlideUp>
  );
};
