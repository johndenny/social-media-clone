import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useQuery } from "urql";
import { TagListProps } from "../components/TagListTextInput";
import { TagSearch, UserSearch } from "../graphQL/queries";
import { UserListI } from "../types";

export const useTextInputSearch = (
  textInput: string,
  setTextInput: Dispatch<SetStateAction<string>>
) => {
  const [searchType, setSearchType] = useState("");
  const [search, setSearch] = useState("");
  let query = UserSearch;
  if (searchType === "@") query = UserSearch;
  if (searchType === "#") query = TagSearch;
  const [searchResult, reexecuteSearch] = useQuery({
    query: query,
    variables: { filter: search },
    pause: !search,
  });

  const [isFocused, setIsFocused] = useState(false);
  const [searchLength, setSearchLength] = useState(0);
  const [searchListUser, setSearchListUser] = useState<UserListI[] | null>(
    null
  );
  const [searchListTag, setSearchListTag] = useState<TagListProps[] | null>(
    null
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!searchType) return;
    if (searchLength > textInput.length || textInput.slice(-1) === " ") {
      setSearchListUser(null);
      setSearchListTag(null);
      setSearch("");
      setSearchType("");
      return;
    }
    const textToSearch = textInput.split(searchType).slice(-1);
    if (textToSearch[0] === "") {
      setSearchListUser(null);
      setSearchListTag(null);
    }
    setSearch(textToSearch[0]);
  }, [textInput]);

  useEffect(() => {
    if (searchResult.data && searchType === "@")
      setSearchListUser(searchResult.data?.usersFilter);
    if (searchResult.data && searchType === "#")
      setSearchListTag(searchResult.data?.tagFilter);
  }, [searchResult]);

  useEffect(() => {
    if (isFocused) return;
    setSearch("");
    setSearchType("");
    setSearchListTag(null);
    setSearchListUser(null);
  }, [isFocused]);

  const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const searchType = text.slice(-1);
    if (searchType === "@" || searchType === "#") {
      setSearchType(searchType);
      setSearchLength(text.length);
    }
    setTextInput(e.target.value);
  };

  const insertSearch = (text: string) => {
    textAreaRef.current?.focus();
    const textarray = textInput.split(" ");
    textarray.splice(-1, 1, `${searchType + text} `);
    setTextInput(textarray.join(" "));
    setSearchType("");
    setSearchListTag(null);
    setSearchListUser(null);
    setSearch("");
  };

  return {
    textAreaRef,
    isFocused,
    setIsFocused,
    textChangeHandler,
    insertSearch,
    searchListUser,
    searchListTag,
    searchType,
  };
};
