import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useMutation } from "urql";
import { PaddedButton } from "../../../components/PaddedButton";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { Button } from "../../../styled";
import { AsideWrapper } from "./components/AsideWrapper";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import {
  Article,
  ButtonContainer,
  CounterText,
  Paragraph,
  TextSubHeader,
} from "./styled";
import { Form } from "./styled/Form";
import { useForm } from "../../../hooks/useForm";
import { formValidationRules } from "./FormValidationRules";
import { ReactComponent as SplashScreenSvg } from "../../../assets/svgs/splashScreen.svg";
import { EditUser } from "../../../graphQL/mutations";
import { LeftHeaderButton } from "../../../components/HeaderMobile";

interface Props {}

export const Edit: React.FC<Props> = () => {
  const {
    setHeaderAttrs,
    viewer,
    setFooterMessage,
    setModalAttrs,
    queryVarsState,
  } = useGlobalContext() as globalContextType;
  const [editResult, editUser] = useMutation(EditUser);
  const [isEdited, setIsEdited] = useState(false);

  const { errors, handleChange, handleSubmit, setValues, values } = useForm(
    editUser,
    formValidationRules,
    viewer?.data?.viewer?.username
  );

  useEffect(() => {
    document.title = "Edit profile • Instagram";
    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Edit profile",
    });
  }, []);

  useLayoutEffect(() => {
    if (!viewer.data) return;
    const { id, ...viewerValues } = viewer?.data?.viewer;
    setValues(viewerValues);
  }, [viewer.data]);

  useEffect(() => {
    if (editResult.data) {
      setFooterMessage("Profile saved");
      setIsEdited(false);
    }
  }, [editResult.data]);

  useEffect(() => {
    if (errors.server) setFooterMessage(errors.server);
  }, [errors.server]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEdited) setIsEdited(true);
    handleChange(e);
  };

  if (viewer.fetching && !queryVarsState.isPreload) return <SplashScreenSvg />;
  return (
    <Article>
      <Header user={viewer?.data?.viewer} setModalAttrs={setModalAttrs} />
      <Form onSubmit={handleSubmit} name="edit">
        <Input
          id="fullName"
          placeholder="Name"
          onChange={changeHandler}
          value={values.fullName || ""}
        >
          <Paragraph>
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </Paragraph>
        </Input>
        <Input
          id="username"
          placeholder="Username"
          onChange={changeHandler}
          value={values.username || ""}
        />
        <Input
          id="url"
          placeholder="Website"
          onChange={changeHandler}
          value={values.url || ""}
        />
        <Input
          id="bio"
          placeholder=""
          label="Bio"
          isTextArea={true}
          onChange={changeHandler}
          value={values.bio || ""}
        >
          <CounterText error={(values.bio?.length || 0) > 150}>
            {values.bio?.length || 0} / 150
          </CounterText>
        </Input>

        <AsideWrapper>
          <TextSubHeader>Personal Information</TextSubHeader>
          <Paragraph>
            Provide your personal information, even if the account is used for a
            business, a pet or something else. This won't be a part of your
            public profile.
          </Paragraph>
        </AsideWrapper>
        <Input
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={values.email || ""}
        />
        <AsideWrapper>
          <ButtonContainer>
            <PaddedButton
              fetching={editResult.fetching}
              padding="var(--slim-button)"
              disabled={Object.keys(errors).length !== 0 || !isEdited}
            >
              Submit
            </PaddedButton>
            <Button>Deactivate my Account</Button>
          </ButtonContainer>
        </AsideWrapper>
      </Form>
    </Article>
  );
};
