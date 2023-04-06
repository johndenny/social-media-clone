export const UniqueUserFeed = `
query($username: String!, $limit: Int!, $skip: Int!) {
  user(username: $username) {
    __typename
    id
    postsPage(limit: $limit, skip: $skip) {
      __typename
      id
      isNextPage
      posts {
        __typename
        id
        createdAt
        text
        isLiked
        isSaved
        isCollected
        isTagged
        isTagHidden
        counts {
          comments
          likes
        }
        postedBy {
          __typename
          id
          photoVersion
          username
        }
        photos {
          __typename
          id
          aspectRatio
          tags {
            __typename
            id
            User {
              __typename
              id
              username
            }
          }
        }
        featuredComments {
          __typename
          id
          text
          isLiked
          postedBy {
            __typename
            id
            username
          }
        }
      }
    }
  }
}
`;
