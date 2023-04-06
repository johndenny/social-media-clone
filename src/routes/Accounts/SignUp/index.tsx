import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";

type ContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isEmailValid: boolean;
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignUp: React.FC = () => {
  const { setHeaderAttrs, isMobile, viewer } =
    useGlobalContext() as globalContextType;
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register • Instagram";
    if (viewer.data) return navigate("/", { replace: true });
    if (isMobile === null) return;
    if (isMobile) {
      setHeaderAttrs({
        leftButton: LeftHeaderButton.backChevron,
        title: "Register",
      });
      if (!email) navigate("/accounts/signup/email", { replace: true });
      return;
    }
    if (!email) navigate("/accounts/signup/emailsignup", { replace: true });
  }, [isMobile, viewer.data]);

  return (
    <Outlet
      context={{
        email,
        setEmail,
        isEmailValid,
        setIsEmailValid,
      }}
    />
  );
};

export function useRegisterContext() {
  return useOutletContext<ContextType>();
}
