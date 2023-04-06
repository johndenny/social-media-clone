import styled from "styled-components";

interface Props {
  height: number;
}

export const ProfilePhotoPlaceholder = styled.div<Props>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.height}px;
  border-radius: 50%;
  background-color: rgb(var(--highlight-background));
`;
