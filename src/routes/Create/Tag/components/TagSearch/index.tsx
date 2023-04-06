import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { SearchMobile } from "../../../../../components/SearchMobile";
import { UserSearch } from "../../../../../graphQL/queries";
import { UserListI } from "../../../../../types";
import { TagProfileList } from "../TagProfileList";
import { SearchContainer } from "./styled";

interface Props {}

export const TagSearch: React.FC<Props> = () => {
  const [searchList, setSearchList] = useState<UserListI[] | null>(null);
  const [search, setSearch] = useState("");
  const [searchResult] = useQuery({
    query: UserSearch,
    variables: { filter: search },
    pause: !search,
  });

  useEffect(() => {
    if (searchResult.data) setSearchList(searchResult.data.usersFilter);
  }, [searchResult]);

  const resetSearchList = () => {
    setSearchList(null);
  };

  return (
    <div>
      <SearchContainer>
        <SearchMobile
          searchList={searchList}
          resetSearchList={resetSearchList}
          setSearch={setSearch}
        />
      </SearchContainer>

      {searchList && <TagProfileList profiles={searchList} />}
    </div>
  );
};
