export const SignUp = `
  mutation($fullName: String!, $username: String!, $password: String!, $email: String!) {
    signup(fullName: $fullName, username: $username, password: $password, email: $email) {
      accessToken
    }
  }
`;
