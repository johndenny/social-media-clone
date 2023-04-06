import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCreateContext } from "..";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { SearchMobile } from "../../../components/SearchMobile";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { SearchContainer } from "../Tag/components/TagSearch/styled";
import { LocationItem } from "./LocationItem";

export interface LocationAddressI {
  house_number?: string;
  road?: string;
  city?: string;
  town?: string;
  village?: string;
  state?: string;
  country: string;
}

export interface LocationI {
  place_id: number;
  lat: string;
  lon: string;
  namedetails: { name: string; "name:en": string };
  address: LocationAddressI;
}

interface Props {}

export const Location: React.FC<Props> = () => {
  const { setHeaderAttrs, setIsFooterNavHidden } =
    useGlobalContext() as globalContextType;
  const [searchList, setSearchList] = useState<LocationI[] | null>(null);
  const [search, setSearch] = useState("");

  useLayoutEffect(() => {
    setHeaderAttrs({
      leftButton: LeftHeaderButton.close,
      title: "Add Location",
    });
    setIsFooterNavHidden(true);
  }, []);

  useEffect(() => {
    if (!search) return;

    const fetchData = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${search}&addressdetails=1&namedetails=1&limit=16&format=json`
      );
      const data = await response.json();
      setSearchList(data);
      console.log(data);
    };

    fetchData();
  }, [search]);

  return (
    <div>
      <SearchContainer>
        <SearchMobile
          setSearch={setSearch}
          resetSearchList={() => setSearchList(null)}
          searchList={searchList}
        />
      </SearchContainer>

      {searchList && (
        <div>
          {searchList.map((location) => {
            return (
              <div key={location.place_id}>
                <LocationItem location={location} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
