import React, { useLayoutEffect, useState } from "react";
import { TextLinkFilter } from "../TextLinkFilter";
import { MoreButton } from "./styled";

const LINE_BREAK = /[\r\n]/;

interface Props {
  text: string;
}

export const MoreText: React.FC<Props> = ({ text }) => {
  const [isTextHidden, setIsTextHidden] = useState(true);
  const [firstSection, setFirstSection] = useState("");
  const [secondSection, setSecondSection] = useState("");

  useLayoutEffect(() => {
    let firstSection = text.slice(0, 115);
    let secondSection = text.slice(115);
    const lineBreak = firstSection.search(LINE_BREAK);
    if (lineBreak !== -1) {
      firstSection = text.slice(0, lineBreak);
      secondSection = text.slice(lineBreak);
    }
    setFirstSection(firstSection);
    setSecondSection(secondSection);
  }, [text]);

  if (
    (text.length <= 115 || secondSection.length < 4) &&
    !text.search(LINE_BREAK)
  )
    return <TextLinkFilter text={text} />;

  return (
    <span>
      <TextLinkFilter text={firstSection} />
      {isTextHidden && (text.length >= 115 || text.search(LINE_BREAK) !== -1) && (
        <span>
          {`... `}
          <MoreButton role="button" onClick={() => setIsTextHidden(false)}>
            more
          </MoreButton>
        </span>
      )}
      {!isTextHidden && <TextLinkFilter text={secondSection} />}
    </span>
  );
};
