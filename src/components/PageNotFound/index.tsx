import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Article } from "./styled/Article";
import { Header } from "./styled/Header";
import { Paragraph } from "./styled/Paragraph";

interface Props {}

export const PageNotFound: React.FC<Props> = () => {
  useEffect(() => {
    document.title = "Page not found • Instagram";
    return () => {
      document.title = "Instagram";
    };
  }, []);
  return (
    <Article>
      <Header>Sorry, this page isn't available.</Header>
      <Paragraph>
        The link you followed may be broken, or the Page may have been removed.{" "}
        <Link to="/">Go back to Instagram</Link>
      </Paragraph>
    </Article>
  );
};
