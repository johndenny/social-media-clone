import React from "react";
import { ListItem, ProfilePhoto, TextContainer, Text } from "./styled";

interface Props {}

export const HomepagePlaceHolder: React.FC<Props> = () => {
  return (
    <div>
      <ListItem>
        <ProfilePhoto></ProfilePhoto>
        <TextContainer>
          <Text style={{ width: "150px" }}></Text>
          <Text></Text>
        </TextContainer>
      </ListItem>
      <ListItem>
        <ProfilePhoto></ProfilePhoto>
        <TextContainer>
          <Text style={{ width: "150px" }}></Text>
          <Text></Text>
        </TextContainer>
      </ListItem>
      <ListItem>
        <ProfilePhoto></ProfilePhoto>
        <TextContainer>
          <Text style={{ width: "150px" }}></Text>
          <Text></Text>
        </TextContainer>
      </ListItem>
      <ListItem>
        <ProfilePhoto></ProfilePhoto>
        <TextContainer>
          <Text style={{ width: "150px" }}></Text>
          <Text></Text>
        </TextContainer>
      </ListItem>
      <ListItem>
        <ProfilePhoto></ProfilePhoto>
        <TextContainer>
          <Text style={{ width: "150px" }}></Text>
          <Text></Text>
        </TextContainer>
      </ListItem>
    </div>
  );
};
