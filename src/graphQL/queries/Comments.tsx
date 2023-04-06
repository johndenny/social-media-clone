export const Comments = `
  query($postId: String!, $limit: Int!, $skip: Int!){
    commentsPaged(postId: $postId, limit: $limit, skip: $skip) {
      __typename
      id
      isNextPage
      comments {
        __typename
        id
        createdAt
        text
        isEdited
        isLiked
        counts {
          likes
          replies
        }
        postedBy {
          __typename
          id
          photoVersion
          username
          fullName
        }
        post {
          __typename
          id
          postedBy {
            __typename
            id
          }
        }
      }
    }
  }
`;
