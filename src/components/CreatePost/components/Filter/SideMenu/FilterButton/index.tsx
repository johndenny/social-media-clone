import React, { useContext } from "react";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../../context/CreatePostContext";
import { globalContextType } from "../../../../../../context/GlobalContext";
import useGlobalContext from "../../../../../../hooks/useGlobalContext";
import { Filters } from "../../../../../../hooks/useMobilePhotoCanvas";
import { Border, Button, Image, Title } from "./styled";

interface FilterButtonI {
  title: string;
  url: string;
  values: {
    temperature: number;
    saturation: number;
    contrast: number;
    brightness: number;
  };
}

interface Props {
  filter: FilterButtonI;
}

export const FilterButton: React.FC<Props> = ({ filter }) => {
  const { urlFiles, setUrlFiles } = useGlobalContext() as globalContextType;
  const { selectedIndex, setResetValues } = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const { title, url, values } = filter;
  const selectedFileFilter = urlFiles[selectedIndex].values.filter;

  const setFilter = (filter: Filters) => {
    const newFiles = [...urlFiles];
    const newValues = { ...urlFiles[selectedIndex].values, filter, ...values };
    newFiles.splice(selectedIndex, 1);
    newFiles.splice(selectedIndex, 0, {
      ...urlFiles[selectedIndex],
      values: newValues,
    });
    setResetValues({ ...values, filter });
    setUrlFiles(newFiles);
  };

  return (
    <Button onClick={() => setFilter(title as Filters)}>
      <Border isSelected={selectedFileFilter === title}>
        <Image draggable={false} alt={`Filter: ${title}`} src={url} />
      </Border>

      <Title isSelected={selectedFileFilter === title}>{title}</Title>
    </Button>
  );
};
