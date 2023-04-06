import styled from "styled-components";

interface Props {}

export const InnerContainer = styled.div<Props>`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-shrink: 0;
  height: 60px;
  max-width: calc(935px + 40px);
  padding: 0 20px;
  width: 100%;
  z-index: 3;
`;
