export const Replies = `
  query($commentId: String!, $limit: Int!, $skip: Int!) {
    comment(commentId: $commentId) {
      __typename
      id
      replyPage(limit: $limit, skip: $skip) {
        __typename
        id
        isNextPage
        replies {
          __typename
          id
          commentId
          createdAt
          text
          isLiked
          likeCount
          postedBy {
            __typename
            id
            photoVersion
            username
            fullName
          }
        }
      }
    }
  }
`;
