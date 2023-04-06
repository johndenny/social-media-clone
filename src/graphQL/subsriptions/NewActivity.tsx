export const NewActivity = `
  subscription {
    newActivity {
      __typename
      id
      activityCounts {
        __typename
        id
        comments
        followRequests
        follows
        likes
        sum
        tagged
        totalFollowRequests
      }
    }
  }
`;
