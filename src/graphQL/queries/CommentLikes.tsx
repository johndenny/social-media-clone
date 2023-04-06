export const CommentLikes = `
  query($commentId: String!, $limit: Int!, $skip: Int!) {
    comment(commentId: $commentId) {
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
