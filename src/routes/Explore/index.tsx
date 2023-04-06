import React, { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { useQuery, UseQueryState } from "urql";
import { HashTagListProps } from "../../components/HashTagListItem";
import { SearchHeader } from "../../components/SearchHeader";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import { TagSearch, UserSearch } from "../../graphQL/queries";
import { Search } from "../../graphQL/queries/Search";
import useGlobalContext from "../../hooks/useGlobalContext";
import { SpinnerContainer } from "../../components/ProfilePhotoButton/styled";
import { Spinner } from "../../components/Spinner";
import { UserListI } from "../../types";

export type SearchListType = {
  id: string;
  hashTag: HashTagListProps;
  user: UserListI;
};

interface Props {}

type ExploreContextType = {
  searchList: SearchListType[] | null;
  resultExplorePosts: UseQueryState<any, object>;
};

export const Explore: React.FC<Props> = () => {
  const { setHeaderAttrs, resultExplorePosts, queryVarsDispatch, isMobile } =
    useGlobalContext() as globalContextType;

  const [search, setSearch] = useState("");
  const [userSearchResult] = useQuery({
    query: UserSearch,
    variables: { filter: search },
    pause: !search,
  });
  const [tagSearchResult] = useQuery({
    query: TagSearch,
    variables: { filter: search },
    pause: !search,
  });
  const [searchResult] = useQuery({
    query: Search,
    variables: { filter: search },
    pause: !search,
  });

  const [searchList, setSearchList] = useState<SearchListType[] | null>(null);

  useLayoutEffect(() => {
    setHeaderAttrs({});
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.explorePosts,
        variables: { limit: 12, skip: 0 },
      },
    });
    return () => {
      queryVarsDispatch({ type: "reset" });
    };
  }, []);

  useEffect(() => {
    if (userSearchResult.data && tagSearchResult.data)
      setSearchList(searchResult.data?.search);
  }, [searchResult.data]);

  if (!resultExplorePosts.data)
    return (
      <SpinnerContainer>
        <Spinner size="large" />
      </SpinnerContainer>
    );

  return (
    <div>
      {isMobile && (
        <SearchHeader
          searchList={searchList}
          setSearch={setSearch}
          setSearchList={setSearchList}
        />
      )}

      <div>
        <Outlet context={{ searchList, resultExplorePosts }} />
      </div>
    </div>
  );
};

export function useExplore() {
  return useOutletContext<ExploreContextType>();
}
