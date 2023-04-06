import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ClearButton,
  ClearIcon,
  Input,
  Label,
  SearchIcon,
  TextContainer,
} from "./styled";
import { SearchListType } from "../../routes/Explore";
import { Spinner } from "../Spinner";
import { UserListI } from "../../types";
import { LocationI } from "../../routes/Create/Location";

interface Props {
  setSearch: Dispatch<SetStateAction<string>>;
  resetSearchList: () => void;
  searchList: SearchListType[] | UserListI[] | LocationI[] | null;
  isHeader?: boolean;
}

export const SearchMobile: React.FC<Props> = ({
  isHeader,
  setSearch,
  searchList,
  resetSearchList,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isHeader || !isFocused) return;
    navigate("search/");
  }, [isFocused]);

  useEffect(() => {
    setSearch("");
    setInputValue("");
    resetSearchList();
  }, [location]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isFetching) setIsFetching(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    setInputValue(e.target.value);
    timerRef.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 300);
  };

  useEffect(() => {
    if (isFetching) setIsFetching(false);
  }, [searchList]);

  const clearHandler = () => {
    setSearch("");
    setInputValue("");
    resetSearchList();
  };

  useEffect(() => {
    if (!inputValue) {
      resetSearchList();
    }
  }, [inputValue]);

  return (
    <Label>
      <Input
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChangeHandler}
        value={inputValue}
      />
      <TextContainer isFocused={isFocused || inputValue !== ""}>
        <SearchIcon></SearchIcon>
        {!inputValue && <span>Search</span>}
      </TextContainer>
      {inputValue && (
        <ClearButton onClick={clearHandler}>
          {isFetching ? <Spinner size="small" /> : <ClearIcon></ClearIcon>}
        </ClearButton>
      )}
    </Label>
  );
};
