import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseQueryState } from "urql";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { Link } from "./styled/Link";

interface Props {
  children?: ReactNode;
  className?: string;
  to: string;
  query: PreloadQuery;
  queryResult: UseQueryState<any, any>;
  variables: {};
  state?: object;
  style?: object;
}

export const PreloadLink: React.FC<Props> = ({
  to,
  query,
  variables,
  className,
  children,
  queryResult,
  state,
  style,
}) => {
  const { queryVarsDispatch } = useGlobalContext() as globalContextType;
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  const preloadHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    // if (queryVarsState[query] === variables) return;
    setIsClicked(true);
    queryVarsDispatch({
      type: "add-preload",
      payload: { query, variables },
    });
  };

  useEffect(() => {
    if (!queryResult.fetching && isClicked) {
      navigate(to, { state });
      setIsClicked(false);
      queryVarsDispatch({ type: "preload" });
      console.log(to);
    }
  }, [queryResult, isClicked]);

  return (
    <Link
      style={style}
      href={to}
      onClick={preloadHandler}
      className={className}
    >
      {children}
    </Link>
  );
};
