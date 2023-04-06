import styled from "styled-components";

interface Props {}

export const Paragraph = styled.p<Props>`
  color: rgb(var(--secondary-text));
  font-size: 12px;
  line-height: 16px;
  margin: 12px 0 8px 0;
  max-width: 355px;
`;
