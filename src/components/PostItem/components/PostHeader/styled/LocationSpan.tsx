import styled from "styled-components";

interface Props {}

export const LocationSpan = styled.span<Props>`
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
