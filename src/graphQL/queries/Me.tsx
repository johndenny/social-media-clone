export const Me = `
query {
  viewer {
    id
    photoVersion
    username
    fullName
    bio
    url
    email
    gender
    isPrivate
    isCollection
    unreadCount
    chatRequestsCount
    activityCounts {
      __typename
      id
      follows
      likes
      comments
      tagged
      followRequests
      totalFollowRequests
      sum
    }
  }
}
`;
