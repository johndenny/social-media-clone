import React from "react";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { StyledPreload } from "./styled/StyledPreload";

interface Props {
  text: string;
}

export const TextLinkFilter: React.FC<Props> = ({ text }) => {
  const { user, resultHashTag } = useGlobalContext() as globalContextType;

  const textArray = text.split(/(\r|\n|\s)/).map((word, index) => {
    if (word[0] === "@") {
      return (
        <StyledPreload
          key={index}
          to={`/${word.substring(1)}`}
          query={PreloadQuery.user}
          queryResult={user}
          variables={{ username: word.substring(1), limit: 12, skip: 0 }}
        >{`${word} `}</StyledPreload>
      );
    }
    if (word[0] === "#") {
      return (
        <StyledPreload
          key={index}
          to={`/explore/tags/${word.substring(1)}/`}
          query={PreloadQuery.hashTag}
          queryResult={resultHashTag}
          variables={{ name: word.substring(1), limit: 12, skip: 0 }}
        >{`${word} `}</StyledPreload>
      );
    }

    return `${word}`;
  });

  return <span>{textArray}</span>;
};
