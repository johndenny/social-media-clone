import React from "react";
import { Button } from "../../styled";
import { HashTagListItem } from "../HashTagListItem";
import { UnorderedList } from "../ProfileListTextInput/styled";

export interface TagListProps {
  name: string;
  postCount: number;
}

interface Props {
  tags: TagListProps[];
  insertSearch: (text: string) => void;
  position: "top" | "bottom";
}

export const TagListTextInput: React.FC<Props> = ({
  tags,
  insertSearch,
  position,
}) => {
  return (
    <UnorderedList position={position}>
      {tags.map((tag) => {
        return (
          <Button
            id="searchItem"
            key={tag.name}
            onClick={() => insertSearch(tag.name)}
            style={{ color: "rgb(var(--primary-text))" }}
          >
            <HashTagListItem {...tag} photoHeight={"30px"} border={position} />
          </Button>
        );
      })}
    </UnorderedList>
  );
};
