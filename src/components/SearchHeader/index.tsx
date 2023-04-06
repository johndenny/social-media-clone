import React, { Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { SearchListType } from "../../routes/Explore";
import { Container, FixedContainer, Spacer } from "../HeaderMobile/styled";
import { SearchMobile } from "../SearchMobile";
import { CancelButton } from "./styled";

interface Props {
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchList: Dispatch<SetStateAction<SearchListType[] | null>>;
  searchList: SearchListType[] | null;
}

export const SearchHeader: React.FC<Props> = ({
  setSearch,
  searchList,
  setSearchList,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useGlobalContext() as globalContextType;

  const resetSearchList = () => {
    setSearchList(null);
  };

  return (
    <nav>
      <Spacer></Spacer>
      <FixedContainer search>
        <Container>
          <SearchMobile
            isHeader={true}
            searchList={searchList}
            setSearch={setSearch}
            resetSearchList={resetSearchList}
          />
          {location.pathname === ("/explore/search/" || "/explore/search") && (
            <CancelButton onClick={() => navigate("/explore/")}>
              Cancel
            </CancelButton>
          )}
        </Container>
      </FixedContainer>
    </nav>
  );
};
