import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "urql";
import { LeftHeaderButton } from "../../../../components/HeaderMobile";
import { PaddedButton } from "../../../../components/PaddedButton";
import { globalContextType } from "../../../../context/GlobalContext";
import { ChangePassword } from "../../../../graphQL/mutations";
import { useForm } from "../../../../hooks/useForm";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { Button } from "../../../../styled";
import { AsideWrapper } from "../../Edit/components/AsideWrapper";
import { Header } from "../../Edit/components/Header";
import { Input } from "../../Edit/components/Input";
import { Article, ButtonContainer, Form } from "../../Edit/styled";
import { formValidationRules } from "./formValidationRules";
import { ErrorText } from "./styled";

interface Props {}

export const Change: React.FC<Props> = () => {
  const { viewer, setHeaderAttrs, setFooterMessage } =
    useGlobalContext() as globalContextType;
  const { data } = viewer;
  const [result, changePasswordMutation] = useMutation(ChangePassword);

  const { errors, handleChange, handleSubmit, setValues, values } = useForm(
    changePasswordMutation,
    formValidationRules
  );

  useEffect(() => {
    document.title = "Change Password • Instagram";
    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Change Password",
    });
  }, []);

  useEffect(() => {
    if (errors.server) setFooterMessage(errors.server);
  }, [errors.server]);

  return (
    <Article>
      <Header user={data?.viewer} />
      <Form onSubmit={handleSubmit} name="change">
        <Input
          type="password"
          id={"oldPassword"}
          label="Old Password"
          placeholder={""}
          onChange={handleChange}
          value={values.oldPassword || ""}
        >
          <ErrorText>{errors.oldPassword}</ErrorText>
        </Input>
        <Input
          type="password"
          id={"newPassword"}
          label="New Password"
          placeholder={""}
          onChange={handleChange}
          value={values.newPassword || ""}
        >
          <ErrorText>{errors.newPassword}</ErrorText>
        </Input>
        <Input
          type="password"
          id={"confirmPassword"}
          label="Confirm New Password"
          placeholder={""}
          onChange={handleChange}
          value={values.confirmPassword || ""}
        >
          <ErrorText>{errors.confirmPassword}</ErrorText>
        </Input>
        <AsideWrapper>
          <ButtonContainer>
            <PaddedButton
              fetching={false}
              padding="var(--slim-button)"
              disabled={Object.keys(errors).length !== 0}
            >
              Submit
            </PaddedButton>
            <Link to="/accounts/password/reset/">Forgot password ?</Link>
          </ButtonContainer>
          <ErrorText>{errors.server}</ErrorText>
        </AsideWrapper>
      </Form>
    </Article>
  );
};
