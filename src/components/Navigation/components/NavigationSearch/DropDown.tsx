import React from "react";
import { useQuery } from "urql";
import { RecentSearch } from "../../../../graphQL/queries";
import { SearchListType } from "../../../../routes/Explore";
import { SearchList } from "../../../SearchList";
import { ContentHeight } from "./styled";
import { Triangle } from "../../../../styled";
import { Spinner } from "../../../Spinner";

interface Props {
  searchList: SearchListType[] | null;
}

export const DropDown: React.FC<Props> = ({ searchList }) => {
  const [recentSearchResult] = useQuery({
    query: RecentSearch,
  });
  const { data, fetching } = recentSearchResult;

  return (
    <>
      <Triangle
        color="rgb(var(--primary-background))"
        height={8}
        isFlipped={false}
        left="50%"
      ></Triangle>
      <ContentHeight>
        {fetching ? (
          <Spinner size="small" containerStyle="fill" />
        ) : (
          <>
            {searchList ? (
              <SearchList searchList={searchList} />
            ) : (
              <SearchList searchList={data?.recentSearch} isRecent={true} />
            )}
          </>
        )}
      </ContentHeight>
    </>
  );
};
