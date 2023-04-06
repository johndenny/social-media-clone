import React from "react";
import { TextPlaceholder } from "../PostItem/styled";
import { ProfilePhotoPlaceholder } from "../ProfilePhoto/styled";
import { Container, List } from "./styled";

interface Props {
  photoHeight?: number;
}

export const ProfileListItemPlaceholder: React.FC<Props> = ({
  photoHeight,
}) => {
  return (
    <List>
      <Container>
        <ProfilePhotoPlaceholder height={photoHeight ? photoHeight : 44} />
        <div style={{ gap: "8px" }}>
          <TextPlaceholder width={88}></TextPlaceholder>
          <TextPlaceholder width={120}></TextPlaceholder>
        </div>
      </Container>
    </List>
  );
};
