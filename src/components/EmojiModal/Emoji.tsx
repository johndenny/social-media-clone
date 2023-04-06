import React, { SetStateAction } from "react";
import { useDirectContext } from "../../routes/Direct";
import { Button, Triangle } from "../../styled";
import {
  Container,
  Header,
  Emoji,
  Section,
  BottomGradient,
  InnerContainer,
} from "./styled";

const mostPopular = [
  0x1f602, 0x1f62f, 0x1f60d, 0x1f622, 0x1f44f, 0x1f525, 0x1f389, 0x1f4af,
  0x2764, 0x1f923, 0x1f970, 0x1f618, 0x1f62d, 0x263a,
];

const smileys = [
  0x1f600, 0x1f603, 0x1f604, 0x1f601, 0x1f606, 0x1f605, 0x1f923, 0x1f602,
  0x1f642, 0x1f643, 0x1f609, 0x1f60a, 0x1f607, 0x1f970, 0x1f60d, 0x1f929,
  0x1f618, 0x1f617, 0x263a, 0x1f61a, 0x1f619, 0x1f60b, 0x1f61b, 0x1f61c,
  0x1f92a, 0x1f61d, 0x1f911, 0x1f917, 0x1f92d, 0x1f92b, 0x1f914, 0x1f910,
  0x1f928, 0x1f610, 0x1f611, 0x1f636, 0x1f60f, 0x1f612, 0x1f644, 0x1f62c,
  0x1f925, 0x1f60c, 0x1f614, 0x1f62a, 0x1f924, 0x1f634, 0x1f637, 0x1f912,
  0x1f915, 0x1f922, 0x1f92e, 0x1f927, 0x1f975, 0x1f976, 0x1f974, 0x1f635,
  0x1f92f, 0x1f920, 0x1f973, 0x1f60e, 0x1f913, 0x1f9d0, 0x1f615, 0x1f61f,
  0x1f641, 0x2639, 0x1f62e, 0x1f62f, 0x1f632, 0x1f633, 0x1f97a, 0x1f626,
  0x1f627, 0x1f628, 0x1f630, 0x1f625, 0x1f622, 0x1f62d, 0x1f631, 0x1f616,
  0x1f623, 0x1f61e, 0x1f613, 0x1f629, 0x1f62b, 0x1f624, 0x1f621, 0x1f620,
  0x1f92c, 0x1f608, 0x1f47f, 0x1f480, 0x2620, 0x1f4a9, 0x1f921, 0x1f479,
  0x1f47a, 0x1f47b, 0x1f47d, 0x1f47e, 0x1f916, 0x1f63a, 0x1f638, 0x1f639,
  0x1f63b, 0x1f63c, 0x1f63d, 0x1f640, 0x1f63f, 0x1f63e, 0x1f648, 0x1f649,
  0x1f64a, 0x1f44b, 0x1f91a, 0x1f590, 0x270b, 0x1f596, 0x1f44c, 0x270c, 0x1f91e,
  0x1f91f, 0x1f918, 0x1f919, 0x1f448, 0x1f449, 0x1f446, 0x1f595, 0x1f447,
  0x261d, 0x1f44d, 0x1f44e, 0x270a, 0x1f44a, 0x1f91b, 0x1f91c, 0x1f44f, 0x1f64c,
  0x1f450, 0x1f932, 0x1f91d, 0x1f64f, 0x270d, 0x1f485, 0x1f933, 0x1f4aa,
  0x1f9b5, 0x1f9b6, 0x1f442, 0x1f443, 0x1f9e0, 0x1f9b7, 0x1f9b4, 0x1f440,
  0x1f441, 0x1f445, 0x1f444,
];

interface Props {
  setComment?: React.Dispatch<SetStateAction<string>>;
  translateX: number;
  orientation: "top" | "bottom";
  messageId?: string;
  setIsEmojiHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Emojis: React.FC<Props> = ({
  setComment,
  translateX,
  orientation,
  messageId,
  setIsEmojiHidden,
}) => {
  const directContext = useDirectContext();

  const clickHandler = (string: string) => {
    if (setComment) return setComment((prevState) => prevState + string);
    if (messageId) directContext.reactionHandler(messageId, string);
    setIsEmojiHidden(true);
  };

  return (
    <Container
      style={
        orientation === "bottom"
          ? { top: "0", transform: `translateX(${translateX}px)` }
          : { bottom: "0", transform: `translateX(${translateX}px)` }
      }
    >
      <InnerContainer>
        <Header>{"Most Popular"}</Header>
        <Section>
          {mostPopular.map((emoji) => {
            const string = String.fromCodePoint(emoji);
            return (
              <Button key={emoji} onClick={() => clickHandler(string)}>
                <Emoji>{string}</Emoji>
              </Button>
            );
          })}
        </Section>
        <Header>{"Smileys & People"}</Header>
        <Section>
          {smileys.map((emoji) => {
            const string = String.fromCodePoint(emoji);
            return (
              <Button key={emoji} onClick={() => clickHandler(string)}>
                <Emoji>{string}</Emoji>
              </Button>
            );
          })}
        </Section>
      </InnerContainer>

      <BottomGradient></BottomGradient>
      <Triangle
        color="rgb(var(--primary-background))"
        height={12}
        isFlipped={orientation === "top"}
        left={`calc(50% - ${translateX}px)`}
      ></Triangle>
    </Container>
  );
};
