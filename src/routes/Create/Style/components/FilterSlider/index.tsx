import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useCreateContext } from "../../..";
import { Filters } from "../../../../../hooks/useMobilePhotoCanvas";
import { filters } from "../../../../../utils/filtersArray";
import { Button, ButtonContainer, Title, Image, Container } from "./styled";

const BUFFER = 1;
const BUTTON_WIDTH = 100;
const TOTAL_FILTER_LENGTH = 12;

interface Props {
  selectedFilter: Filters;
  setSelectedFilter: Dispatch<SetStateAction<Filters>>;
}

export const FilterSlider: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollLeft, setScrollLeft, listOptions, setListOptions } =
    useCreateContext();

  useEffect(() => {
    if (listRef.current?.scrollLeft === 0) {
      listRef.current.scrollLeft = scrollLeft;
    }

    if (listOptions.length) return;
    const domRect = listRef.current?.getBoundingClientRect();
    if (!domRect) return;
    const visibleLength = Math.ceil(domRect?.width / BUTTON_WIDTH) + BUFFER;
    setListOptions({ ...listOptions, length: visibleLength });
  }, []);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  useEffect(() => {
    let scrolledPast = Math.floor(scrollLeft / BUTTON_WIDTH) - BUFFER;
    if (scrolledPast === -1) scrolledPast = 0;
    if (listOptions.start === scrolledPast) return;
    setListOptions({ ...listOptions, start: scrolledPast });
  }, [scrollLeft]);

  const selectHandler = (title: Filters) => {
    if (selectedFilter === title) return;
    setSelectedFilter(title);
  };

  return (
    <Container ref={listRef} onScroll={scrollHandler}>
      <ButtonContainer
        paddingLeft={listOptions.start * BUTTON_WIDTH}
        paddingRight={
          (TOTAL_FILTER_LENGTH - listOptions.length - listOptions.start) *
          BUTTON_WIDTH
        }
      >
        {filters.map((filter, index) => {
          const { title, url } = filter;
          const { start, length } = listOptions;
          if (index >= start && index <= length + start) {
            return (
              <Button
                key={title}
                onClick={() => selectHandler(title as Filters)}
              >
                <Title selected={title === selectedFilter}>{title}</Title>
                <Image alt={`Filter: ${title}`} src={url} />
              </Button>
            );
          }
          return null;
        })}
      </ButtonContainer>
    </Container>
  );
};
