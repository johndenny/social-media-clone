export const AddPeople = `
  mutation($members: [String!]!, $chatId: String!) {
    addPeople(members: $members, chatId: $chatId) {
      __typename
      id
      name
      admins
      members {
        __typename
        id
        photoVersion
        username
        fullName
      }
    }
  }
`;
