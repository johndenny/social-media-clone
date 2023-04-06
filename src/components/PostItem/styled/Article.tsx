import styled from "styled-components";

interface Props {}

export const Article = styled.article<Props>`
  @media (min-width: 600px) {
    border-radius: 8px;
    border: 1px solid rgb(var(--stroke));
  }
  background-color: rgb(var(--primary-background));
`;
