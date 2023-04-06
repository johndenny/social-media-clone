import React, {
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ProfilePhoto } from "../../../../../components/ProfilePhoto";
import { ReactComponent as OptionsSvg } from "../../../../../assets/svgs/optionsDots.svg";
import { Button } from "../../../../../styled";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../../context/GlobalContext";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../../../components/HeaderMobile";
import {
  BoldText,
  MemberContainer,
  NameInput,
  OptionsButton,
  SecondaryText,
  Section,
  MembersHeader,
  RemoveButton,
  SecondaryParagraph,
} from "./styled";
import { PreloadLink } from "../../../../../components/PreloadLink";
import { SaveChatName } from "../../../../../graphQL/mutations/SaveChatName";
import { useMutation } from "urql";
import { useParams } from "react-router-dom";
import { UserNamesI } from "../../../../../types";

interface Props {
  members: UserNamesI[];
  admins: UserNamesI[];
  infoToggle: () => void;
  isAdmin: boolean;
  name: string;
}

export const ChatInfo: React.FC<Props> = ({
  members,
  admins,
  infoToggle,
  isAdmin,
  name,
}) => {
  const params = useParams();
  const {
    isMobile,
    viewer,
    setHeaderAttrs,
    user,
    setModalAttrs,
    setFooterMessage,
  } = useGlobalContext() as globalContextType;
  const [nameText, setNameText] = useState(name);
  const [resultSaveName, saveNameMutation] = useMutation(SaveChatName);

  useLayoutEffect(() => {
    if (isMobile)
      return setHeaderAttrs({
        leftButton: LeftHeaderButton.backChevron,
        title: "Details",
        leftOnClick: infoToggle,
      });
    setHeaderAttrs({
      title: "Details",
      rightButton: RightHeaderButton.info,
      rightOnClick: infoToggle,
    });
  }, []);

  const optionsHandler = (e: SyntheticEvent, id: string, isAdmin: boolean) => {
    e.stopPropagation();
    e.preventDefault();
    setModalAttrs({ type: "members", variables: { id, isAdmin } });
  };

  const saveChatName = () => {
    saveNameMutation({ name: nameText, chatId: params.chatId }).then(
      (result) => {
        setHeaderAttrs({
          leftButton: LeftHeaderButton.backChevron,
          title: "Details",
          leftOnClick: infoToggle,
        });
        if (result.error) setFooterMessage("Error saving chat name.");
      }
    );
  };

  useEffect(() => {
    if (!isMobile) return;
    if (nameText && nameText !== name)
      return setHeaderAttrs({
        leftButton: LeftHeaderButton.backChevron,
        title: "Details",
        leftOnClick: infoToggle,
        rightButton: RightHeaderButton.save,
        rightOnClick: saveChatName,
      });
    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Details",
      leftOnClick: infoToggle,
    });
  }, [nameText]);

  return (
    <>
      {isAdmin && (
        <Section>
          <label htmlFor="name">
            {"Group name: "}
            <NameInput
              id="name"
              placeholder="Add a name..."
              onChange={(e) => setNameText(e.target.value)}
              value={nameText}
            />
          </label>
        </Section>
      )}
      <Section style={{ padding: "16px 0" }}>
        <MembersHeader>
          <span>Members</span>
          {isAdmin && (
            <Button
              onClick={() =>
                setModalAttrs({ type: "add", variables: { members } })
              }
            >
              Add People
            </Button>
          )}
        </MembersHeader>
        {members.map((profile) => {
          if (admins.length === 0 && profile.id === viewer.data?.viewer.id)
            return null;
          const adminIndex = admins.findIndex(
            (admin) => admin.id === profile.id
          );
          return (
            <PreloadLink
              key={profile.id}
              to={`/${profile.username}/`}
              query={PreloadQuery.user}
              queryResult={user}
              variables={{ username: profile.username, limit: 12, skip: 0 }}
            >
              <MemberContainer>
                <ProfilePhoto
                  height={"56px"}
                  isWithoutLink={true}
                  isWithoutModal={true}
                  {...profile}
                />
                <div>
                  <BoldText>{profile.username}</BoldText>
                  <SecondaryText>
                    {adminIndex === -1
                      ? profile.fullName
                      : profile.fullName
                      ? `Admin · ${profile.fullName}`
                      : "Admin"}
                  </SecondaryText>
                </div>
                {profile.id !== viewer.data?.viewer.id &&
                  admins.length !== 0 &&
                  isAdmin && (
                    <OptionsButton
                      onClick={(e) =>
                        optionsHandler(e, profile.id, adminIndex !== -1)
                      }
                    >
                      <OptionsSvg height={"24"} width={"24"} />
                    </OptionsButton>
                  )}
              </MemberContainer>
            </PreloadLink>
          );
        })}
      </Section>
      <Section>
        {admins.length !== 0 && (
          <>
            <RemoveButton onClick={() => setModalAttrs({ type: "leave-chat" })}>
              Leave Chat
            </RemoveButton>
            <SecondaryParagraph>
              You won't get messages from this group unless someone adds you
              back to the chat.
            </SecondaryParagraph>
          </>
        )}
        {(isAdmin || admins.length === 0) && (
          <RemoveButton onClick={() => setModalAttrs({ type: "delete-chat" })}>
            Delete Chat
          </RemoveButton>
        )}
      </Section>
    </>
  );
};
