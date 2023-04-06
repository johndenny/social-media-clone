import styled from "styled-components";

interface Props {}

export const FixedContainer = styled.div<Props>`
  position: fixed;
  width: 100%;
  max-width: inherit;
  gap: 8px;
`;
