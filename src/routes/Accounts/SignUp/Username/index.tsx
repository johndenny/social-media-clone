import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { PaddedButton } from "../../../../components/PaddedButton";
import Input from "../../../../components/Input";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { LoginForm, Parargraph } from "../../styled";
import { SignUpTextHeader } from "../styled";
import { Button } from "../../../../styled";
import { useForm } from "../../../../hooks/useForm";
import { formValidationRules } from "./formValidateRules";
import { Me } from "../../../../graphQL/queries";
import { EditUser } from "../../../../graphQL/mutations";
import { getAccessToken } from "../../../../utils/accessToken";

interface Props {}

export const Username: React.FC<Props> = () => {
  const { reexecuteViewerQuery, setFooterMessage, viewer } =
    useGlobalContext() as globalContextType;
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const navigate = useNavigate();
  const [result, editUser] = useMutation(EditUser);
  const [resultUsername, reexecuteUsernameQuery] = useQuery({
    query: Me,
  });
  const { errors, handleChange, handleSubmit, setValues, values } = useForm(
    editUser,
    formValidationRules,
    resultUsername?.data?.viewer?.username
  );
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isUsernameEdit) usernameRef.current?.focus();
  }, [isUsernameEdit]);

  useEffect(() => {
    if (resultUsername?.data && isUsernameEdit) {
      setValues({ ...resultUsername?.data?.viewer });
    }
  }, [resultUsername.data, isUsernameEdit]);

  useEffect(() => {
    if (result.data) reexecuteViewerQuery();
  }, [result.data]);

  useEffect(() => {
    if (errors.server) setFooterMessage(errors.server);
  }, [errors.server]);

  const submitHandler = (e: SyntheticEvent) => {
    if (
      !isUsernameEdit ||
      resultUsername?.data?.viewer?.username === values.username
    ) {
      e.preventDefault();
      return reexecuteViewerQuery();
    }
    handleSubmit(e);
  };

  return (
    <>
      {isUsernameEdit ? (
        <>
          <SignUpTextHeader>Change Username</SignUpTextHeader>
          <Parargraph>
            Pick a username for your account. You can always change it later.
          </Parargraph>
        </>
      ) : (
        <>
          <SignUpTextHeader>{`Welcome to Instagram, ${resultUsername?.data?.viewer?.username}`}</SignUpTextHeader>
          <Parargraph>
            Find people to follow and start sharing photos. You can change your
            username anytime.
          </Parargraph>
          <Button margin="16px" onClick={() => setIsUsernameEdit(true)}>
            Change username
          </Button>
        </>
      )}
      <LoginForm onSubmit={reexecuteViewerQuery} name="username">
        {isUsernameEdit && (
          <Input
            Type="username"
            name="username"
            label="Username"
            type="text"
            value={values.username || ""}
            onChange={handleChange}
            errorMessage={errors.username}
            Ref={usernameRef}
          />
        )}
        <PaddedButton
          fetching={result.fetching}
          margin="16px"
          padding="10px 18px"
          disabled={Object.keys(errors).length !== 0}
        >
          Next
        </PaddedButton>
      </LoginForm>
    </>
  );
};
