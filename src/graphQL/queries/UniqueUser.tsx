export const UniqueUser = `
  query($username: String!, $limit: Int!, $skip: Int!) {
    user(username: $username) {
      __typename
      id
      photoVersion
      username
      fullName
      bio
      url
      isPrivate
      counts {
        __typename
        id
        followedBy
        follows
        media
      }
      isFollowing
      isRequested
      mutualFollowers {
        __typename
        id
        count
        users {
          __typename
          id
          username
        }
      }
      postsPage(limit: $limit, skip: $skip) {
        __typename
        id
        isNextPage
        posts {
          __typename
          id
          text
          counts {
            likes
            comments
          }
          photos {
            __typename
            id
            aspectRatio
          }          
        }
      }
    }
  }
`;
