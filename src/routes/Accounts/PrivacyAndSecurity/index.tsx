import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMutation } from "urql";
import { CheckboxInput } from "../../../components/CheckboxInput";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { globalContextType } from "../../../context/GlobalContext";
import { EditUser } from "../../../graphQL/mutations";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { Article, TitleText } from "./styled";

interface Props {}

export const PrivacyAndSecurity: React.FC<Props> = () => {
  const { setHeaderAttrs, viewer, setFooterMessage } =
    useGlobalContext() as globalContextType;
  const { data } = viewer;
  const [isChecked, setIsChecked] = useState<boolean>(data?.viewer.isPrivate);

  const [result, editUserMutation] = useMutation(EditUser);

  useEffect(() => {
    document.title = "Privacy and Security • Instagram";
    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Privacy and Security",
    });
  }, []);

  useEffect(() => {
    if (result.data) setFooterMessage("Profile saved.");
  }, [result.data]);

  return (
    <Article>
      <TitleText>Account Privacy</TitleText>
      <div style={{ gap: "12px" }}>
        <CheckboxInput
          onClick={() =>
            editUserMutation({
              ...data?.viewer,
              isPrivate: isChecked ? false : true,
            })
          }
          labelText="Private Account"
          id="account-privacy"
          onChange={() =>
            setIsChecked((prevState) => (prevState ? false : true))
          }
          checked={isChecked}
        />
        <p style={{ color: "rgb(var(--secondary-text))" }}>
          When your account is private, only people you approve can see your
          photos and videos on Instagram. Your existing followers won't be
          affected.
        </p>
      </div>
    </Article>
  );
};
