import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  FixedContainer,
  LeftButton,
  Logo,
  MessageCountContainer,
  PaddingContainer,
  RightButton,
  Spacer,
  Title,
} from "./styled";
import { ReactComponent as InfoSvg } from "../../assets/svgs/info.svg";
import { ReactComponent as OptionsSvg } from "../../assets/svgs/options.svg";
import { ReactComponent as MessengerSvg } from "../../assets/svgs/messenger.svg";
import { ReactComponent as NewStorySvg } from "../../assets/svgs/newStory.svg";
import { ReactComponent as DiscoverPeopleSvg } from "../../assets/svgs/discoverPeople.svg";
import { ReactComponent as NewMessageSvg } from "../../assets/svgs/newMessage.svg";
import { ReactComponent as InfoSelectedSvg } from "../../assets/svgs/infoSelected.svg";
import { ReactComponent as ArrowSvg } from "../../assets/svgs/arrow.svg";
import { ReactComponent as ChevronSvg } from "../../assets/svgs/chevron.svg";
import { ReactComponent as OptionsDotsSvg } from "../../assets/svgs/optionsDots.svg";
import { Button } from "../../styled";
import { StyledLink } from "../FooterMobile/styled";
import { PaddedButton } from "../PaddedButton";
import { ReactComponent as CloseSvg } from "../../assets/svgs/close.svg";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import { PreloadLink } from "../PreloadLink";
import { Link } from "react-router-dom";
import { ProfilePhoto } from "../ProfilePhoto";
import { DoubleProfilePhoto } from "../DoubleProfilePhoto";
import { Spinner } from "../Spinner";
import { UserListI } from "../../types";

export enum LeftHeaderButton {
  backChevron = "back-chevron",
  newStory = "new-story",
  options = "options",
  close = "close",
  arrow = "arrow",
}

export enum RightHeaderButton {
  messenger = "messenger",
  discoverPeople = "discover-people",
  save = "save",
  next = "next",
  share = "share",
  done = "done",
  newMessage = "new-message",
  info = "info",
  close = "close",
  send = "send",
  fetching = "fetching",
  optionsDots = "optionsDots",
}

export interface HeaderProps {
  leftButton?: LeftHeaderButton;
  rightButton?: RightHeaderButton;
  rightOnClick?: () => void;
  leftOnClick?: () => void;
  rightFetch?: boolean;
  profiles?: UserListI[];
  /**
   * if title is null component returns null
   */
  title?: string;
}

export const HeaderMobile: React.FC<HeaderProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultSuggestedUsers, viewer, isMobile } =
    useGlobalContext() as globalContextType;
  const {
    title,
    leftButton,
    rightButton,
    rightOnClick,
    leftOnClick,
    profiles,
  } = props;

  if (!title) {
    return null;
  }

  if (title === "logged-out")
    return (
      <div>
        <Spacer></Spacer>
        <FixedContainer>
          <Container>
            <div>
              <StyledLink to="/">
                <Logo
                  aria-label="Instagram"
                  role="img"
                  className="coreSpriteMobileNavTypeLogo"
                ></Logo>
              </StyledLink>
            </div>
            <div>
              <PaddedButton onClick={() => navigate("/")}>Log in</PaddedButton>
            </div>
          </Container>
        </FixedContainer>
      </div>
    );
  return (
    <>
      {isMobile && <Spacer></Spacer>}
      <FixedContainer
        isWide={!isMobile}
        isWideChat={
          !isMobile &&
          (rightButton === "info" ||
            rightButton === "new-message" ||
            title === "Message Requests")
        }
      >
        <Container>
          <LeftButton isHidden={!isMobile && rightButton === "info"}>
            {leftButton && (
              <Button onClick={leftOnClick ? leftOnClick : () => navigate(-1)}>
                {leftButton === "close" && <CloseSvg />}
                {leftButton === "options" && <OptionsSvg />}
                {leftButton === "back-chevron" && (
                  <span style={{ transform: "rotate(-90deg)" }}>
                    <ChevronSvg />
                  </span>
                )}
                {leftButton === "new-story" && <NewStorySvg />}
                {leftButton === "arrow" && <ArrowSvg />}
              </Button>
            )}
          </LeftButton>

          <Title profiles={profiles}>
            {profiles && (
              <>
                {profiles.length === 1 ? (
                  <ProfilePhoto
                    height={"24px"}
                    photoVersion={profiles[0].photoVersion}
                    id={profiles[0].id}
                    username={profiles[0].username}
                    isWithoutModal={true}
                  />
                ) : (
                  <DoubleProfilePhoto height={"32px"} profiles={profiles} />
                )}
              </>
            )}

            {title !== "logo" && title}

            {title === "logo" && (
              <StyledLink to="/">
                <Logo
                  aria-label="Instagram"
                  role="img"
                  className="coreSpriteMobileNavTypeLogo"
                ></Logo>
              </StyledLink>
            )}
          </Title>

          <RightButton isHidden={false}>
            {rightButton === "messenger" && (
              <StyledLink to="/direct/inbox/">
                {viewer.data?.viewer.unreadCount !== 0 && (
                  <MessageCountContainer>
                    {viewer.data?.viewer.unreadCount}
                  </MessageCountContainer>
                )}

                <MessengerSvg />
              </StyledLink>
            )}
            {rightButton === "discover-people" && (
              <PaddingContainer>
                <PreloadLink
                  to="/explore/people"
                  query={PreloadQuery.suggestedUsers}
                  queryResult={resultSuggestedUsers}
                  variables={{ limit: 16, skip: 0 }}
                >
                  <DiscoverPeopleSvg />
                </PreloadLink>
              </PaddingContainer>
            )}
            {rightButton === "fetching" && <Spinner size="small" />}
            {rightButton === "send" && (
              <Button onClick={rightOnClick}>Send</Button>
            )}
            {rightButton === "save" && (
              <Button onClick={rightOnClick}>Save</Button>
            )}
            {rightButton === "next" && (
              <Button
                onClick={rightOnClick}
                disabled={Boolean(rightOnClick) === false}
              >
                Next
              </Button>
            )}
            {rightButton === "share" && (
              <Button onClick={rightOnClick}>Share</Button>
            )}
            {rightButton === "done" && (
              <Button onClick={rightOnClick}>Done</Button>
            )}
            {rightButton === "new-message" && (
              <Link
                to="/direct/new/"
                state={!isMobile ? { background: location.pathname } : null}
              >
                <NewMessageSvg />
              </Link>
            )}
            {rightButton === "info" && (
              <Button onClick={rightOnClick}>
                {title === "Details" ? <InfoSelectedSvg /> : <InfoSvg />}
              </Button>
            )}
            {rightButton === "close" && (
              <Button onClick={rightOnClick}>
                <CloseSvg />
              </Button>
            )}
            {rightButton === "optionsDots" && (
              <Button onClick={rightOnClick}>
                <OptionsDotsSvg height={24} width={24} />
              </Button>
            )}
          </RightButton>
        </Container>
      </FixedContainer>
    </>
  );
};
