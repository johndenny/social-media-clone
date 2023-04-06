import React from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "urql";
import { globalContextType } from "../../../context/GlobalContext";
import { AdminToggle, RemovePeople } from "../../../graphQL/mutations";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { BackDrop, Container, ModalButton } from "../styled";

interface Props {
  id: string;
  isAdmin: boolean;
}

export const Members: React.FC<Props> = ({ id, isAdmin }) => {
  const params = useParams();
  const { setFooterMessage, setModalAttrs } =
    useGlobalContext() as globalContextType;
  const [resultRemovePeople, removePeopleMutation] = useMutation(RemovePeople);
  const [resultAdminToggle, adminToggleMutation] = useMutation(AdminToggle);

  const removePeople = () => {
    removePeopleMutation({ memberId: id, chatId: params.chatId }).then(
      (result) => {
        setModalAttrs(null);
        if (result.error) setFooterMessage("Error removing member.");
      }
    );
  };

  const adminToggle = () => {
    adminToggleMutation({ memberId: id, chatId: params.chatId }).then(
      (result) => {
        setModalAttrs(null);
        if (result.error) setFooterMessage("Error changing admin status.");
      }
    );
  };
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalButton onClick={removePeople} color="--error">
          Remove From Group
        </ModalButton>
        <ModalButton onClick={adminToggle} color="--primary-text" weight="400">
          {isAdmin ? "Remove as Admin" : "Make Admin"}
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
