export const Reply = `
  mutation($postId: String!, $commentId: String!, $text: String!) {
    __typename
    reply(postId: $postId, commentId: $commentId, text: $text) {
      comment {
        id
        counts {
          replies
        }
      }
      __typename
      id
      commentId
      createdAt
      text
      likeCount
      postedBy {
        id
        photoVersion
        username
      }
    }
  }
`;
