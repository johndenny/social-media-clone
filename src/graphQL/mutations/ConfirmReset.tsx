export const ConfirmReset = `
  mutation($password: String!, $userId: String!, $resetToken: String!) {
    confirmReset(password: $password, userId: $userId, resetToken: $resetToken) {
      reset
    }
  }
`;
