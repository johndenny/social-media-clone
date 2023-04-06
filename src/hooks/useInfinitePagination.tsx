import { useLayoutEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useWindowSize from "./useWindowSize";

export interface PageVariablesI {
  limit: number;
  skip: number;
}

type PayloadType = {
  query?: PageVariablesI;
  isFetching?: boolean;
  scrollY?: number;
};

export type InitialStateType = {
  moreVars: PageVariablesI[];
  isFetching: boolean;
  isLastPage: boolean;
  scrollY: number;
  skip: number;
};

export type ScrollActionType = {
  type: "fetching" | "last-page" | "next-page" | "scroll" | "reset" | "skip";
  payload?: PayloadType;
};

export const intialState = {
  moreVars: [] as PageVariablesI[],
  isFetching: false,
  isLastPage: false,
  scrollY: 0,
  skip: 0,
};

export function reducer(state: InitialStateType, action: ScrollActionType) {
  const { type, payload } = action;
  switch (type) {
    case "fetching":
      if (payload?.isFetching === undefined) return state;
      return {
        ...state,
        isFetching: payload?.isFetching,
      };
    case "scroll":
      if (payload?.scrollY === undefined) return state;
      return {
        ...state,
        scrollY: payload?.scrollY,
      };
    case "last-page":
      return {
        ...state,
        isLastPage: true,
      };
    case "next-page":
      if (!payload?.query) return state;
      return {
        ...state,
        skip: state.skip + payload.query.limit,
        moreVars: [...state.moreVars, payload.query],
      };
    case "reset":
      return intialState;
    default:
      return state;
  }
}

interface Props {
  limit: number;
  type?: "modal" | "chat";
}

export const useInfinitePagination = ({ limit, type }: Props) => {
  const { height } = useWindowSize();
  const [scrollState, scrollDispatch] = useReducer(reducer, intialState);
  const params = useParams();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const morePosts = () => {
    scrollDispatch({ type: "fetching", payload: { isFetching: true } });

    scrollDispatch({
      type: "next-page",
      payload: {
        query: {
          limit: limit,
          skip: scrollState.skip,
        },
      },
    });
  };

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    const { top } = scrollRef.current.getBoundingClientRect();
    setHeaderHeight(top);
  }, []);

  useLayoutEffect(() => {
    if (
      !scrollRef.current ||
      !viewportRef.current ||
      scrollState.isLastPage ||
      scrollState.isFetching ||
      scrollState.moreVars.length === 0
    )
      return;
    const height = viewportRef.current.clientHeight;
    const scrollHeight = scrollRef.current.scrollHeight;
    if (height > scrollHeight) morePosts();
  }, [scrollState.isFetching, height]);

  useLayoutEffect(() => {
    if (type === "modal") return;
    const handleScroll = () => {
      scrollDispatch({ type: "scroll", payload: { scrollY: window.scrollY } });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (scrollRef.current)
      scrollDispatch({
        type: "scroll",
        payload: { scrollY: scrollRef.current.scrollTop },
      });
  };

  useLayoutEffect(() => {
    if (type === undefined || !scrollRef.current) return;
    const ref = scrollRef.current;

    ref.addEventListener("scroll", handleScroll);

    return () => {
      ref.removeEventListener("scroll", handleScroll);
    };
  }, [type]);

  useLayoutEffect(() => {
    if (!scrollRef.current || scrollState.isFetching || scrollState.isLastPage)
      return;

    let currentScroll = scrollState.scrollY + window.innerHeight;
    let scrollHeight = scrollRef.current.clientHeight + headerHeight;

    if (type === "modal") {
      currentScroll = scrollState.scrollY + scrollRef.current.clientHeight;
      scrollHeight = scrollRef.current.scrollHeight;
    }
    if (type === "chat") {
      currentScroll = scrollState.scrollY * -1 + scrollRef.current.clientHeight;
      scrollHeight = scrollRef.current.scrollHeight;
    }

    if (scrollHeight < currentScroll + 100) {
      morePosts();
    }
  }, [scrollState.scrollY, params]);

  return {
    scrollRef,
    viewportRef,
    scrollDispatch,
    scrollState,
    morePosts,
  };
};
