import React, { useState } from "react";
import { filters } from "../../../../../utils/filtersArray";
import { AdjustmentMenu } from "./AdjustmentMenu";
import { FilterButton } from "./FilterButton";
import { FilterContainer, Header, HeaderButton, Section } from "./styled";

type SelectedTabI = "filters" | "adjustments";

interface Props {}

export const SideMenu: React.FC<Props> = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTabI>("filters");

  return (
    <Section>
      <Header>
        <HeaderButton
          onClick={() => setSelectedTab("filters")}
          isSelected={selectedTab === "filters"}
        >
          Filters
        </HeaderButton>
        <HeaderButton
          onClick={() => setSelectedTab("adjustments")}
          isSelected={selectedTab === "adjustments"}
        >
          Adjustments
        </HeaderButton>
      </Header>
      {selectedTab === "filters" && (
        <FilterContainer>
          {filters.map((filter) => {
            return <FilterButton key={filter.title} filter={filter} />;
          })}
        </FilterContainer>
      )}
      {selectedTab === "adjustments" && <AdjustmentMenu />}
    </Section>
  );
};
