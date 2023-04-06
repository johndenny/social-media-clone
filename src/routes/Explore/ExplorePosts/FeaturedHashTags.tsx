import React, { useEffect } from "react";
import { useQuery } from "urql";
import { TopHashTags } from "../../../graphQL/queries";
import { HashTagPreload } from "./styled/HashTagPreload";
import { HashTagContainer } from "./styled/HashTagContainer";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { HashTagSpacer } from "./styled";

interface Props {}

export const FeaturedHashTags: React.FC<Props> = () => {
  const { resultHashTag } = useGlobalContext() as globalContextType;
  const [resultHashTags] = useQuery({
    query: TopHashTags,
  });

  if (resultHashTags.fetching || resultHashTags.data.topHashTags.length === 0)
    return <HashTagSpacer></HashTagSpacer>;

  return (
    <div>
      <HashTagSpacer></HashTagSpacer>
      <HashTagContainer>
        {resultHashTags.data?.topHashTags.map(
          (hashTag: { name: string; id: string }) => {
            return (
              <HashTagPreload
                key={hashTag.id}
                to={`/explore/tags/${hashTag.name}`}
                query={PreloadQuery.hashTag}
                queryResult={resultHashTag}
                variables={{ name: hashTag.name }}
              >
                {`#${hashTag.name}`}
              </HashTagPreload>
            );
          }
        )}
      </HashTagContainer>
    </div>
  );
};
