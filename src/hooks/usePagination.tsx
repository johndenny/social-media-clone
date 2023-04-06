import { useReducer, useState } from "react";
import { intialState, reducer } from "./useInfinitePagination";

type Props = {
  limit: number;
  isReply?: boolean;
};

export const usePagination = ({ limit, isReply }: Props) => {
  const [pageState, pageDispatch] = useReducer(reducer, intialState);
  const [skip, setSkip] = useState(0);

  const nextPage = () => {
    pageDispatch({ type: "fetching", payload: { isFetching: true } });

    setSkip((prevState) => prevState + limit);

    let payload = { query: { limit, skip: skip + limit } };
    //first page included in page state
    if (isReply) payload = { query: { limit, skip } };

    pageDispatch({
      type: "next-page",
      payload,
    });
  };

  return { pageState, pageDispatch, nextPage };
};
