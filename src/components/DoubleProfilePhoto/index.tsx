import React from "react";
import { UserNamesI } from "../../types";
import { ProfilePhoto } from "../ProfilePhoto";
import { BottomPhoto, Container, TopPhoto } from "./styled";

interface Props {
  height: string;
  profiles: UserNamesI[];
}

export const DoubleProfilePhoto: React.FC<Props> = ({ height, profiles }) => {
  if (height === "56px")
    return (
      <Container height={height}>
        <TopPhoto>
          <ProfilePhoto
            height={"40px"}
            isWithoutLink={true}
            isWithoutModal={true}
            {...profiles[1]}
          />
        </TopPhoto>
        <BottomPhoto topLeft="14px" padding="2px">
          <ProfilePhoto
            height={"40px"}
            isWithoutLink={true}
            isWithoutModal={true}
            {...profiles[0]}
          />
        </BottomPhoto>
      </Container>
    );
  if (height === "40px")
    return (
      <Container height={height}>
        <TopPhoto>
          <ProfilePhoto
            height={"32px"}
            isWithoutLink={true}
            isWithoutModal={true}
            {...profiles[1]}
          />
        </TopPhoto>
        <BottomPhoto topLeft="8px" padding="1px">
          <ProfilePhoto
            height={"32px"}
            isWithoutLink={true}
            isWithoutModal={true}
            {...profiles[0]}
          />
        </BottomPhoto>
      </Container>
    );
  return (
    <Container height={height} marginTop="4px">
      <TopPhoto>
        <ProfilePhoto
          height={"20px"}
          isWithoutLink={true}
          isWithoutModal={true}
          {...profiles[1]}
        />
      </TopPhoto>
      <BottomPhoto topLeft="8px" padding="1px">
        <ProfilePhoto
          height={"20px"}
          isWithoutLink={true}
          isWithoutModal={true}
          {...profiles[0]}
        />
      </BottomPhoto>
    </Container>
  );
};
