export const ReplyLikes = `
  query($replyId: String!, $limit: Int!, $skip: Int!) {
    uniqueReply(replyId: $replyId) {
      __typename
      id
      likes(limit: $limit, skip: $skip) {
        __typename
        id
        isNextPage
        profiles {
          __typename
          id
          photoVersion
          username
          fullName
          isFollowing
          isPrivate
          isRequested
        }
      }
    }
  }
`;
