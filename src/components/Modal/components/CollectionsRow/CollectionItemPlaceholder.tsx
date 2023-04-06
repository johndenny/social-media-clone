import React from "react";
import {
  PlaceholderContainer,
  PlaceholderPhoto,
  PlaceholderText,
} from "./styled";

interface Props {}

export const CollectionItemPlaceholder: React.FC<Props> = () => {
  return (
    <PlaceholderContainer>
      <PlaceholderPhoto></PlaceholderPhoto>
      <PlaceholderText></PlaceholderText>
    </PlaceholderContainer>
  );
};
