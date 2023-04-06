import React, { SyntheticEvent } from "react";
import {
  Container,
  List,
  PrimaryText,
  RecentButton,
  SecondaryText,
} from "./ProfileListItem/styled";
import { Span } from "./ProfilePhoto/styled/Span";
import { ReactComponent as HashTagSvg } from "../assets/svgs/hashTag.svg";
import { ReactComponent as CloseSmallSvg } from "../assets/svgs/closeSmall.svg";
import { useMutation } from "urql";
import { RemoveHashTagSearch } from "../graphQL/mutations";

export type HashTagListProps = {
  name: string;
  postCount: number;
};

export interface Props extends HashTagListProps {
  photoHeight: string;
  border?: "top" | "bottom";
  isRecent?: boolean;
}

export const HashTagListItem: React.FC<Props> = ({
  name,
  postCount,
  photoHeight,
  border,
  isRecent,
}) => {
  const [removeHashTagSearchResult, removeHashTagSearch] =
    useMutation(RemoveHashTagSearch);

  const removeRecentSearch = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeHashTagSearch({ hashTagName: name });
  };

  return (
    <List border={border}>
      <Container>
        <Span height={photoHeight}>
          <HashTagSvg />
        </Span>
        <div>
          <PrimaryText>{`#${name}`}</PrimaryText>
          <SecondaryText>{`${postCount} ${
            postCount === 1 ? "post" : "posts"
          }`}</SecondaryText>
        </div>
      </Container>
      {isRecent && (
        <RecentButton onClick={removeRecentSearch}>
          <CloseSmallSvg stroke="#8e8e8e" />
        </RecentButton>
      )}
    </List>
  );
};
