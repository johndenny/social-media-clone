import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Input, SearchList } from "./styled";
import { ReactComponent as LocationMarkerSvg } from "../../../../../assets/svgs/locationMarker.svg";
import { LocationI } from "../../../../../routes/Create/Location";
import { LocationItem } from "../../../../../routes/Create/Location/LocationItem";
import { ReactComponent as CloseSvg } from "../../../../../assets/svgs/close.svg";
import { Spinner } from "../../../../Spinner";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../context/CreatePostContext";

interface Props {}

export const LocationSearch: React.FC<Props> = () => {
  const { postLocation, setPostLocation } = useContext(
    CreatePostContext
  ) as CreatePostContextType;
  const [searchList, setSearchList] = useState<LocationI[]>([]);
  const [isQueryPaused, setIsQueryPaused] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (abortController) abortController.abort();
    setAbortController(new AbortController());

    if (timerRef.current) clearTimeout(timerRef.current);

    setSearchText(e.currentTarget.value);

    if (e.currentTarget.value === "") {
      setSearchList([]);
      setIsFetching(false);
      setIsQueryPaused(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    setIsFetching(true);

    timerRef.current = setTimeout(() => {
      if (isQueryPaused) setIsQueryPaused(false);
    }, 300);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsQueryPaused(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${searchText}&addressdetails=1&namedetails=1&limit=16&format=json`,
          { signal: abortController?.signal }
        );
        const data = await response.json();
        setSearchList(data);
        setIsFetching(false);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError")
          console.log("fetch aborted");
        else throw error;
        setIsFetching(false);
        setIsQueryPaused(true);
      }
    };

    if (!isQueryPaused) fetchData();
  }, [isQueryPaused, searchText, abortController]);

  const resetHandler = (isPostReset: boolean) => {
    if (abortController) abortController.abort();
    setIsFetching(false);
    setSearchList([]);
    setIsQueryPaused(true);
    setSearchText("");
    if (isPostReset) setPostLocation(null);
  };

  return (
    <Container>
      {postLocation ? (
        <span
          style={{
            fontSize: "16px",
            paddingLeft: "8px",
            fontWeight: "600",
            whiteSpace: "nowrap",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {postLocation.name}
        </span>
      ) : (
        <Input
          placeholder="Add Location"
          onChange={changeHandler}
          value={searchText}
        />
      )}

      {searchText || postLocation ? (
        <button
          style={{ flexBasis: "32px" }}
          onClick={() => resetHandler(true)}
        >
          <CloseSvg height={16} />
        </button>
      ) : (
        <LocationMarkerSvg height={16} fill={"rgb(var(--primary-text))"} />
      )}

      {(isFetching || (searchList.length !== 0 && searchText.length !== 0)) && (
        <SearchList>
          {isFetching ? (
            <Spinner size="large" containerStyle="fill" />
          ) : (
            <div onClick={() => resetHandler(false)}>
              {searchList.map((location) => (
                <LocationItem key={location.place_id} location={location} />
              ))}
            </div>
          )}
        </SearchList>
      )}
    </Container>
  );
};
