import React from "react";
import { useNavigate } from "react-router-dom";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { BackDrop, Container, ModalButton } from "../styled";

interface Props {}

export const ViewerProfileOptions: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { setModalAttrs, logOut } = useGlobalContext() as globalContextType;

  const navigateHandler = (link: string) => {
    navigate(link);
    setModalAttrs(null);
  };

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalButton
          onClick={() => navigateHandler("/accounts/password/change/")}
          weight="400"
          color="--primary-text"
        >
          Change password
        </ModalButton>
        <ModalButton
          onClick={() => navigateHandler("/accounts/privacy_and_security/")}
          weight="400"
          color="--primary-text"
        >
          Privacy and security
        </ModalButton>
        <ModalButton onClick={logOut} weight="400" color="--primary-text">
          Log out
        </ModalButton>
        <ModalButton
          onClick={() => setModalAttrs(null)}
          weight="400"
          color="--primary-text"
        >
          Cancel
        </ModalButton>
      </Container>
    </BackDrop>
  );
};
