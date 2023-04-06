import styled from "styled-components";

export const TextHeaderContainer = styled.div`
  align-items: center;
  flex-direction: row;
  flex-shrink: 1;
  min-width: 0;
  gap: 6px;
  margin-bottom: 12px;

  @media (min-width: 736px) {
    margin-bottom: 20px;
    gap: 8px;
  }
`;
