export const ConfirmEmail = `
  mutation($email: String!, $passcode: Int!) {
    confirmEmail(email: $email, passcode: $passcode) {
      status
    }
  }
`;
