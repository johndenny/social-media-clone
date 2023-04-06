import React from "react";
import { useQuery } from "urql";
import { useExplore } from "..";
import { SearchList } from "../../../components/SearchList";
import { RecentSearch } from "../../../graphQL/queries";

interface Props {}

export const Search: React.FC<Props> = () => {
  const { searchList } = useExplore();
  const [recentSearchResult] = useQuery({
    query: RecentSearch,
  });
  const { data, fetching } = recentSearchResult;

  if (fetching) return null;

  return searchList ? (
    <SearchList searchList={searchList} />
  ) : (
    <SearchList searchList={data?.recentSearch} isRecent={true} />
  );
};
