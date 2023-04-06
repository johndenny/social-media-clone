import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ClearSprite,
  Container,
  DropDownContainer,
  DropDownContent,
  Input,
  SpinnerContainer,
  TextContainer,
} from "./styled";
import { ReactComponent as SearchSvg } from "../../../../assets/svgs/searchSmall.svg";
import { DropDown } from "./DropDown";
import { ClickCatch } from "../../styled";
import { useLocation } from "react-router-dom";
import { useQuery } from "urql";
import { Search } from "../../../../graphQL/queries";
import { SearchListType } from "../../../../routes/Explore";
import { Spinner } from "../../../Spinner";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";

interface Props {}

export const NavigationSearch: React.FC<Props> = () => {
  const location = useLocation();
  const { viewer } = useGlobalContext() as globalContextType;
  const [search, setSearch] = useState("");
  const [searchResult] = useQuery({
    query: Search,
    variables: { filter: search },
    pause: !search,
    requestPolicy: "network-only",
  });
  const { data, fetching } = searchResult;
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchList, setSearchList] = useState<SearchListType[] | null>(null);
  const isLoggedIn = Boolean(viewer.data);

  useEffect(() => {
    if (isAnimating && !isClicked) setIsAnimating(false);
    if (isClicked && inputRef.current) inputRef.current.focus();
  }, [isClicked]);

  useEffect(() => {
    if (!isClicked) return;
    setIsAnimating(true);
  }, [location]);

  useEffect(() => {
    if (data) setSearchList(data.search);
  }, [searchResult.data]);

  useEffect(() => {
    if (search === "") setSearchList(null);
  }, [search]);

  const clearSearch = () => {
    setIsAnimating(true);
    setSearch("");
    setIsClicked(false);
  };

  return (
    <Container>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        ref={inputRef}
        aria-label="Search input"
        autoCapitalize="none"
        placeholder="Search"
        type="text"
      />
      {!isClicked && (
        <Button onClick={() => setIsClicked(true)}>
          <TextContainer>
            <SearchSvg />
            <span>{search ? search : "Search"}</span>
          </TextContainer>
        </Button>
      )}
      {isClicked && (
        <>
          {fetching ? (
            <SpinnerContainer>
              <Spinner size="small" />
            </SpinnerContainer>
          ) : (
            <ClearSprite onClick={clearSearch}></ClearSprite>
          )}
          <ClickCatch onClick={() => setIsAnimating(true)}></ClickCatch>
        </>
      )}

      <DropDownContainer>
        {((!isLoggedIn && isClicked && searchList) ||
          (isLoggedIn && isClicked)) && (
          <DropDownContent
            isAnimating={isAnimating}
            onAnimationEnd={() => setIsClicked(false)}
          >
            <DropDown searchList={searchList} />
          </DropDownContent>
        )}
      </DropDownContainer>
    </Container>
  );
};
