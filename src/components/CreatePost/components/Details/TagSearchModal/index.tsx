import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "urql";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../context/CreatePostContext";
import { UserSearch } from "../../../../../graphQL/queries";
import { TagProfileList } from "../../../../../routes/Create/Tag/components/TagProfileList";
import { ClearIcon } from "../../../../SearchMobile/styled";
import { Container, Header, SearchInput, TitleText } from "./styled";
import useWindowSize from "../../../../../hooks/useWindowSize";
import { Triangle } from "../../../../../styled";
import { Spinner } from "../../../../Spinner";
import { UserListI } from "../../../../../types";

interface Props {}

export const TagSearchModal: React.FC<Props> = () => {
  const { height } = useWindowSize();
  const { tagSearchLocation, setTagSearchLocation } = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const [searchList, setSearchList] = useState<UserListI[] | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, reexecuteSearch] = useQuery({
    query: UserSearch,
    variables: { filter: search },
    pause: !search,
  });
  const [isFetching, setIsFetching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isFlipped = tagSearchLocation
    ? tagSearchLocation.clientY + 250 > height
    : false;

  useEffect(() => {
    if (searchResult.data) setSearchList(searchResult.data.usersFilter);
  }, [searchResult]);

  useEffect(() => {
    if (!search) resetHandler();
  }, [search]);

  useEffect(() => {
    if (isFetching) setIsFetching(false);
  }, [searchList]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [tagSearchLocation]);

  useEffect(() => {
    const closeModal = () => setTagSearchLocation(null);

    window.addEventListener("click", closeModal);
    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, []);

  const resetHandler = () => {
    setSearchList(null);
    setInputValue("");
    setSearch("");
    if (inputRef.current) inputRef.current.focus();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isFetching) setIsFetching(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    setInputValue(e.target.value);
    timerRef.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 300);
  };

  return (
    <Container
      isFlipped={isFlipped}
      onClick={(e) => e.stopPropagation()}
      style={{
        height: "224px",
        width: "324px",
        left: tagSearchLocation?.clientX,
        top: tagSearchLocation?.clientY,
      }}
    >
      <Triangle
        color="rgb(var(--primary-background))"
        height={8}
        isFlipped={isFlipped}
        left="26px"
      ></Triangle>
      <Header>
        <TitleText>Tag:</TitleText>
        <SearchInput
          ref={inputRef}
          placeholder="Search..."
          autoCapitalize="none"
          autoComplete="off"
          onChange={changeHandler}
          value={inputValue}
        />
        {inputValue && (
          <button onClick={resetHandler}>
            {isFetching ? <Spinner size="small" /> : <ClearIcon></ClearIcon>}
          </button>
        )}
      </Header>
      {searchList && <TagProfileList profiles={searchList} />}
    </Container>
  );
};
