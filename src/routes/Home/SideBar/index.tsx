import React, { useRef } from "react";
import { useQuery } from "urql";
import { PreloadLink } from "../../../components/PreloadLink";
import { ProfileListLinks } from "../../../components/ProfileListLinks";
import { ProfilePhoto } from "../../../components/ProfilePhoto";
import { UsernameLink } from "../../../components/UsernameLink";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import { SuggestedUsers } from "../../../graphQL/queries";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { Button } from "../../../styled";
import {
  FixedContainer,
  Section,
  SuggestionHeader,
  TextContainer,
  TextHeader,
  ViewerDetails,
} from "./styled";
import { HomepagePlaceHolder } from "../../Explore/People/HomepagePlaceholder";

interface Props {}

export const SideBar: React.FC<Props> = () => {
  const { viewer, setModalAttrs, resultSuggestedUsers, modalAttrs } =
    useGlobalContext() as globalContextType;
  const { data } = viewer;
  const distanceToTopRef = useRef<HTMLDivElement | null>(null);

  const [result] = useQuery({
    query: SuggestedUsers,
    variables: { limit: 5, skip: 0 },
  });

  return (
    <Section>
      <FixedContainer
        ref={distanceToTopRef}
        style={{
          top:
            modalAttrs && distanceToTopRef
              ? distanceToTopRef.current?.offsetTop
              : "",
        }}
      >
        <ViewerDetails>
          <ProfilePhoto
            height={"56px"}
            isWithoutModal={true}
            {...data.viewer}
          />
          <TextContainer>
            <div style={{ width: "100%" }}>
              <UsernameLink
                username={data.viewer.username}
                isWithoutModal={true}
              />
            </div>

            {data.viewer.fullName && (
              <span style={{ color: "rgb(var(--secondary-text))" }}>
                {data.viewer.fullName}
              </span>
            )}
          </TextContainer>
          <Button
            onClick={() => setModalAttrs({ type: "log-in-switch" })}
            style={{ fontSize: "12px" }}
          >
            Switch
          </Button>
        </ViewerDetails>
        <SuggestionHeader>
          <TextHeader>Suggestions for you</TextHeader>
          <PreloadLink
            style={{ fontSize: "12px", color: "rgb(var(--primary-text))" }}
            to={"/explore/people/"}
            query={PreloadQuery.suggestedUsers}
            queryResult={resultSuggestedUsers}
            variables={{ limit: 16, skip: 0 }}
          >
            See All
          </PreloadLink>
        </SuggestionHeader>
        {result.fetching ? (
          <HomepagePlaceHolder />
        ) : (
          <ProfileListLinks
            profiles={result.data?.suggestedUsers.profiles}
            isHomepage={true}
          />
        )}
      </FixedContainer>
    </Section>
  );
};
