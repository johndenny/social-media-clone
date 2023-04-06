import styled from "styled-components";

interface Props {}

export const AddPhotoButton = styled.button<Props>`
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(var(--stroke));
  border-radius: 50%;
  height: 48px;
  width: 48px;
  margin: 0 6px;
  :active {
    background-color: rgb(var(--primary-background));
  }
`;
