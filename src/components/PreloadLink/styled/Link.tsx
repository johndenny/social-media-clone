import styled from "styled-components";

interface Props {}

export const Link = styled.a<Props>`
  color: rgb(var(--primary-text));
  &:visited {
    color: rgb(var(--primary-text));
  }
  font-weight: 600;
  cursor: pointer;
`;
