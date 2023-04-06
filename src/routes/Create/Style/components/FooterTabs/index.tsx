import React, { Dispatch, SetStateAction } from "react";
import { Button, Container } from "./styled";

interface Props {
  setSelectedTab: Dispatch<SetStateAction<"edit" | "filter">>;
  selectedTab: "edit" | "filter";
}

export const FooterTabs: React.FC<Props> = ({
  setSelectedTab,
  selectedTab,
}) => {
  return (
    <Container>
      <Button
        selected={selectedTab === "filter"}
        onClick={() => setSelectedTab("filter")}
      >
        Filter
      </Button>
      <Button
        selected={selectedTab === "edit"}
        onClick={() => setSelectedTab("edit")}
      >
        Edit
      </Button>
    </Container>
  );
};
