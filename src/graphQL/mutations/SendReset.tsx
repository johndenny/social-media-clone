export const SendReset = `
  mutation($email: String!) {
    sendReset(email: $email) {
      censoredEmail
    }
  }
`;
