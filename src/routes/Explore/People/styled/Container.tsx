import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  @media (min-width: 600px) {
    background-color: rgb(var(--primary-background));
    border: 1px solid rgb(var(--stroke));
    margin: 24px 0 24px 0;
    border-radius: 6px;
    max-width: 600px;
    align-self: center;
    width: 100%;
    flex: 1;
  }
`;
