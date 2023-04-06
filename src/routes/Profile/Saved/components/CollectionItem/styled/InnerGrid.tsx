import styled from "styled-components";

interface Props {}

export const InnerGrid = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
`;
