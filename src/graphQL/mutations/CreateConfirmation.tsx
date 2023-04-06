export const CreateConfirmation = `
  mutation($email: String!) {
    createEmailConfirmation(email: $email) {
      status
    }
  }
`;
