import styled from "styled-components";

interface Props {}

export const ActivityContainer = styled.div<Props>`
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  align-self: center;
  text-align: center;
  flex: 1;
  font-size: 12px;
  color: rgb(var(--secondary-text));
`;
