import React from "react";
import { useQuery } from "urql";
import { messageLikeType } from "../..";
import { MessageLikeItem } from "../../../../../components/Modal/components/MessageLikeItem";
import { ProfileListLinksPlaceholder } from "../../../../../components/ProfileListLinks/ProfileListLinksPlaceholder";
import { ProfileListPage } from "../../../../../components/ProfileListLinks/ProfileListPage";
import { MessageReactions } from "../../../../../graphQL/queries";
import { useInfinitePagination } from "../../../../../hooks/useInfinitePagination";
import { Container } from "../../../../Post/LikedBy/styled";

interface Props {
  messageId: string;
}

export const ReactionList: React.FC<Props> = ({ messageId }) => {
  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 16,
    type: "modal",
  });

  return (
    <Container ref={scrollRef}>
      {scrollState.moreVars.map((vars, index) => {
        return (
          <ProfileListPage
            key={index + vars.skip}
            variables={{ ...vars, messageId }}
            scrollDispatch={scrollDispatch}
            query={MessageReactions}
            queryName="uniqueMessage"
            pageName="reactionsPage"
          />
        );
      })}
    </Container>
  );
};
