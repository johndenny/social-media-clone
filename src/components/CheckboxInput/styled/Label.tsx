import styled from "styled-components";

interface Props {}

export const Label = styled.label<Props>`
  color: rgb(var(--primary-text));
  font-weight: 600;
  display: flex;
  align-items: center;
`;
