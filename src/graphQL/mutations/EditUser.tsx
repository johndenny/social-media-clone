export const EditUser = `
  mutation($fullName: String!, $username: String!, $bio: String!, $url: String!, $email: String!, $isPrivate: Boolean!) {
    editUser(fullName: $fullName, username: $username, bio: $bio, url: $url, email: $email, isPrivate: $isPrivate) {
      __typename
      id
      fullName
      username
      bio
      url
      email
      isPrivate
    }
  }
`;
