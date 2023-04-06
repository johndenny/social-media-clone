export const CheckUsername = `
  query($username: String!) {
    checkUsername(username: $username)
  }
`;
