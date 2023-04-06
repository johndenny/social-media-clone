import React from "react";
import { useMutation } from "urql";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import { ClearRecentSearch } from "../../graphQL/mutations";
import useGlobalContext from "../../hooks/useGlobalContext";
import { SearchListType } from "../../routes/Explore";
import { Button } from "../../styled";
import { HashTagListItem } from "../HashTagListItem";
import { PreloadLink } from "../PreloadLink";
import { ProfileListItem } from "../ProfileListItem";
import { Header, Hover, Placeholder } from "./styled";

interface Props {
  searchList: SearchListType[];
  isRecent?: boolean;
}

export const SearchList: React.FC<Props> = ({ searchList, isRecent }) => {
  const { resultHashTag, user, addRecentUserSearch, addRecentHashTagSearch } =
    useGlobalContext() as globalContextType;

  const [clearRecentResult, clearRecentSearch] = useMutation(ClearRecentSearch);

  return (
    <>
      {isRecent && searchList.length === 0 && (
        <Placeholder>No recent searchs.</Placeholder>
      )}
      <section>
        {isRecent && (
          <>
            <Header>
              <h2>Recent</h2>
              {searchList.length !== 0 && (
                <Button onClick={() => clearRecentSearch({})}>Clear all</Button>
              )}
            </Header>
          </>
        )}

        <ul>
          {searchList.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() =>
                  item.hashTag
                    ? addRecentHashTagSearch(item.hashTag.name)
                    : addRecentUserSearch(item.id)
                }
              >
                {item.hashTag === null ? (
                  <PreloadLink
                    to={`/${item.user.username}/`}
                    query={PreloadQuery.user}
                    queryResult={user}
                    variables={{
                      username: item.user.username,
                      limit: 12,
                      skip: 0,
                    }}
                  >
                    <Hover>
                      <ProfileListItem
                        user={item.user}
                        isWithoutLink={true}
                        photoHeight="44px"
                        isRecent={isRecent}
                      />
                    </Hover>
                  </PreloadLink>
                ) : (
                  <PreloadLink
                    to={`/explore/tags/${item.hashTag.name}/`}
                    query={PreloadQuery.hashTag}
                    queryResult={resultHashTag}
                    variables={{ name: item.hashTag.name, limit: 12, skip: 0 }}
                  >
                    <Hover>
                      <HashTagListItem
                        {...item.hashTag}
                        photoHeight="44px"
                        isRecent={isRecent}
                      />
                    </Hover>
                  </PreloadLink>
                )}
              </div>
            );
          })}
        </ul>
      </section>
    </>
  );
};
