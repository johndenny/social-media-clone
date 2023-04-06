import React from "react";
import { CollectionI, CollectionItem } from "../CollectionItem";
import { Container } from "./styled";

interface Props {
  collections: CollectionI[];
}

export const CollectionGrid: React.FC<Props> = ({ collections }) => {
  return (
    <Container>
      {collections.map((collection) => (
        <CollectionItem key={collection.id} collection={collection} />
      ))}
    </Container>
  );
};
