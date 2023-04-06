import React, { useContext, useEffect, useRef } from "react";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../context/CreatePostContext";
import { Triangle } from "../../../../styled";
import { Container } from "./styled";

interface Props {
  children: React.ReactNode;
  setVisibleState: React.Dispatch<React.SetStateAction<boolean>>;
  isAnimating: boolean;
  setAnimationState: React.Dispatch<React.SetStateAction<boolean>>;
  type: "gallery" | "tags";
}

export const InstructionPopUp: React.FC<Props> = ({
  children,
  setVisibleState,
  isAnimating,
  setAnimationState,
  type,
}) => {
  const { setInstructionConsumed } = useContext(
    CreatePostContext
  ) as CreatePostContextType;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setAnimationState(true);
    }, 12000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const animationEndHandler = (e: React.AnimationEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isAnimating) return;

    switch (type) {
      case "gallery":
        setInstructionConsumed((prevState) => {
          return { ...prevState, gallery: true };
        });
        break;
      case "tags":
        setInstructionConsumed((prevState) => {
          return { ...prevState, tags: true };
        });
        break;
      default:
        break;
    }

    setVisibleState(false);
    setAnimationState(false);
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <Container
        type={type}
        isClosing={isAnimating}
        onAnimationEnd={animationEndHandler}
      >
        <span>{children}</span>
        <Triangle
          isFlipped={true}
          height={8}
          color="rgba(32,32,32,0.95)"
          left="50%"
        ></Triangle>
      </Container>
    </div>
  );
};
