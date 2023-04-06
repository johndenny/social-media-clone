import styled from "styled-components";

interface Props {}

export const HashTagContainer = styled.div<Props>`
  padding: 8px;
  background-color: rgb(var(--primary-background));
  position: fixed;
  z-index: 2;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  max-width: calc(935px);
  justify-self: center;
  @media (min-width: 735px) {
    width: calc(100% - (27px * 2));
    background-color: rgb(var(--secondary-background));
    padding: 16px 0;
  }
`;
