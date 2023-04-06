import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import useWindowSize from "../../../hooks/useWindowSize";
import { ReactionList } from "../../../routes/Direct/Chat/components/ReactionList";
import { HeaderMobile, RightHeaderButton } from "../../HeaderMobile";
import { BackDrop, Container } from "../styled";
import { SlideUp } from "./SlideUp";

interface Props {
  id: string;
}

export const MessageLikes: React.FC<Props> = ({ id }) => {
  const { height } = useWindowSize();
  const { isMobile, setModalAttrs } = useGlobalContext() as globalContextType;

  return isMobile ? (
    <SlideUp title={"Reactions"} contentHeight={height / 2}>
      <ReactionList messageId={id} />
    </SlideUp>
  ) : (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <div style={{ height: "400px" }}>
          <HeaderMobile
            title="Reactions"
            rightButton={RightHeaderButton.close}
            rightOnClick={() => setModalAttrs(null)}
          />
          <ReactionList messageId={id} />
        </div>
      </Container>
    </BackDrop>
  );
};
