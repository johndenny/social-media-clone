import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../../../App";
import { Followers } from "../../../routes/Profile/Followers";
import { HeaderMobile, RightHeaderButton } from "../../HeaderMobile";
import { BackDrop, Container } from "../styled";

interface Props {}

export const FollowersModal: React.FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <BackDrop
      onClick={() =>
        navigate(`${(location.state as LocationState).background}`)
      }
      isSecondary
    >
      <Container
        onClick={(e) => e.stopPropagation()}
        style={{ height: "400px" }}
      >
        <HeaderMobile
          title="Followers"
          rightButton={RightHeaderButton.close}
          rightOnClick={() =>
            navigate(`${(location.state as LocationState).background}`)
          }
        />
        <Followers />
      </Container>
    </BackDrop>
  );
};
