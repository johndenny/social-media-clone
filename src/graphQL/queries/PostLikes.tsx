export const PostLikes = `
  query($postId: String!, $limit: Int!, $skip: Int!) {
    uniquePost(postId: $postId) {
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
