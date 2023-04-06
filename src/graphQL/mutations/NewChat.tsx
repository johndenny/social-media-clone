export const NewChat = `
  mutation($members: [String!]!) {
    newChat(members: $members) {
      __typename
      id
      members {
        id
        photoVersion
        username
        fullName
      }
    }
  }
`;
