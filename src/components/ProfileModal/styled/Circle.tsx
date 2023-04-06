import styled from "styled-components";

interface Props {}

export const Circle = styled.div<Props>`
  padding: 8px;
  border: 1px solid rgb(var(--primary-text));
  border-radius: 50%;
`;
