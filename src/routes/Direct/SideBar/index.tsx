import React, { useEffect } from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { Container } from "./styled/Container";
import { Header } from "./styled/Header";
import { Inbox } from "../Inbox";
import {
  HeaderMobile,
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../components/HeaderMobile";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  isRequests: boolean;
  setIsRequests: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar: React.FC<Props> = ({ setIsRequests, isRequests }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { viewer } = useGlobalContext() as globalContextType;

  useEffect(() => {
    setIsRequests(
      location.pathname === "/direct/requests/" ||
        location.pathname === "/direct/requests"
    );
  }, [location]);

  if (!viewer.data) return <></>;

  return (
    <Container>
      <Header>
        <HeaderMobile
          title={isRequests ? "Message Requests" : viewer.data?.viewer.username}
          rightButton={isRequests ? undefined : RightHeaderButton.newMessage}
          leftButton={isRequests ? LeftHeaderButton.backChevron : undefined}
          leftOnClick={() => navigate("/direct/inbox/")}
        />
      </Header>
      <div style={{ flex: "1" }}>
        <Inbox isRequests={isRequests} />
      </div>
    </Container>
  );
};
