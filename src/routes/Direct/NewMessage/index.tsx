import React, { useEffect, useLayoutEffect } from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { NewMessageForm } from "../../../components/NewMessageForm";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../../../components/Modal";
import { LocationState } from "../../../App";

interface Props {}

export const NewMessage: React.FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setHeaderAttrs, setIsFooterNavHidden, isMobile } =
    useGlobalContext() as globalContextType;

  useEffect(() => {
    if (!isMobile && !(location.state as LocationState)?.background)
      navigate("", { state: { background: "/direct/inbox/" } });
  }, []);

  useLayoutEffect(() => {
    setHeaderAttrs({});
    setIsFooterNavHidden(true);
    return () => {
      setIsFooterNavHidden(false);
    };
  }, []);

  if (isMobile) return <NewMessageForm />;

  return <Modal type={"new-message"} variables={undefined} />;
};
