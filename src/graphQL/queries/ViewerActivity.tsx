export const ViewerActivty = `
  query($limit: Int!, $skip: Int!, $date: String!) {
    activityPage(limit: $limit, skip: $skip, date: $date)  {
      __typename
      id
      isNextPage
      followRequests {
        __typename
        id
        photoVersion
        username
        fullName
      }
      activity {
        __typename
        id
        createdAt
        type
        isRead
        sentBy {
          __typename
          id
          photoVersion
          username
          fullName
          isFollowing
        }
        post {
          __typename
          id
          text
          postedBy {
            __typename
            id
            username
          }
          photos {
            __typename
            id
          }
        }
        comment {
          __typename
          id
          text
        }
        reply {
          __typename
          id
          text
        }
      }
      activityCounts {
        __typename
        id
        comments
        follows
        likes
        tagged
        followRequests
        totalFollowRequests
        sum
      }
    }
  }
`;
