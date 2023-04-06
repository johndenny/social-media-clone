import styled from "styled-components";

interface Props {}

export const SecondaryText = styled.span<Props>`
  color: rgb(var(--secondary-text));
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
