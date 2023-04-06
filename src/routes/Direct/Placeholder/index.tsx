import React from "react";
import { PaddedButton } from "../../../components/PaddedButton";
import { Container, Title, Text } from "./styled";
import { ReactComponent as MessageLarge } from "../../../assets/svgs/messageLarge.svg";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {}

export const Placeholder: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <MessageLarge />
      <Title>Your Message</Title>
      <Text>Send private photos and messages to a friend or group.</Text>
      <PaddedButton
        onClick={() =>
          navigate("new/", { state: { background: location.pathname } })
        }
      >
        Send Message
      </PaddedButton>
    </Container>
  );
};
