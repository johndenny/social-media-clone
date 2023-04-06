import styled from "styled-components";

interface Props {}

export const PrimaryText = styled.span<Props>`
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
`;
