export const UploadProfilePhoto = `
mutation($url: String!) {
  uploadProfilePhoto(url: $url) {
    __typename
    id
    photoVersion
  }
}
`;
