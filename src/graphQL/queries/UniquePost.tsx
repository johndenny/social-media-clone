export const UniquePost = `
  query($postId: String!) {
    uniquePost(postId: $postId) {
      id
      __typename
      createdAt
      text
      isEdited
      isLiked
      isSaved
      isCollected
      isTagged
      isTagHidden
      likeCount
      counts {
        comments
        likes
      }
      postedBy {
        __typename
        id
        photoVersion
        username
        isFollowing
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
          x
          y
        }
      }
      location {
        __typename
        id
        name
      }
      featuredComments {
        __typename
        id
        text
        postedBy {
          __typename
          id
          username
        }
        isLiked
      }
    }
  }
`;
