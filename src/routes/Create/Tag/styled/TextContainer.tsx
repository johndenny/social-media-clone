import styled from "styled-components";

interface Props {}

export const TextContainer = styled.div<Props>`
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  color: rgb(var(--secondary-text));
`;
