export const FollowingPosts = `
  query($date: String!, $limit: Int!, $skip: Int!) {
    followingPosts(date: $date, limit: $limit, skip: $skip) {
      __typename
      id
      isNextPage
      posts {
        __typename
        id
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
            x
            y
            User {
              __typename
              id
              username
            }
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
  }
`;
