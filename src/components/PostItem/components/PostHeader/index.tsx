import React, { useState } from "react";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { ProfilePhoto } from "../../../ProfilePhoto";
import { Header, LeftHeader, LocationSpan, OverflowContainer } from "./styled";
import { ReactComponent as OptionsDotsSvg } from "../../../../assets/svgs/optionsDots.svg";
import { Button } from "../../styled";
import { UsernameLink } from "../../../UsernameLink";
import { useLocation } from "react-router-dom";
import { LocationState } from "../../../../App";
import { PreloadLink } from "../../../PreloadLink";
import { FollowButton } from "../../../FollowButton";
import { PostValues } from "../..";

interface Props {
  post: PostValues;
}

export const PostHeader: React.FC<Props> = ({ post }) => {
  const location = useLocation();
  const { setModalAttrs, isMobile, resultLocation, viewer } =
    useGlobalContext() as globalContextType;
  const { postedBy } = post;
  const postLocation = post.location;
  const [isFollowing, setIsFollowing] = useState(postedBy.isFollowing);
  const isViewer = viewer.data?.viewer.id === postedBy.id;

  return (
    <Header>
      <LeftHeader
        isMobile={
          isMobile ||
          (location.state as LocationState)?.background !== undefined
        }
      >
        <ProfilePhoto {...postedBy} height="32px" />
        <div style={{ minWidth: "0", flex: "1" }}>
          <div style={{ flexDirection: "row", gap: "4px" }}>
            <OverflowContainer>
              <UsernameLink username={postedBy.username} />
            </OverflowContainer>
            {!isFollowing && !isViewer && (
              <>
                •
                <div style={{ flex: 1 }}>
                  <FollowButton
                    isInline={true}
                    user={postedBy}
                    followingId={postedBy.id}
                  />
                </div>
              </>
            )}
          </div>

          {postLocation && (
            <OverflowContainer>
              <PreloadLink
                to={`/explore/locations/${postLocation.id}/`}
                query={PreloadQuery.location}
                queryResult={resultLocation}
                variables={{
                  locationId: postLocation.id,
                  limit: 16,
                  skip: 0,
                }}
                style={{ display: "flex", maxWidth: "100%" }}
              >
                <LocationSpan>{postLocation.name}</LocationSpan>
              </PreloadLink>
            </OverflowContainer>
          )}
        </div>
      </LeftHeader>
      <Button
        style={{ padding: "12px" }}
        onClick={() =>
          setModalAttrs({
            type: "post-options",
            variables: { post: post },
          })
        }
      >
        <OptionsDotsSvg width={24} height={24} />
      </Button>
    </Header>
  );
};
