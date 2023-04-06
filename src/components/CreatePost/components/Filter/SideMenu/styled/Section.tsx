import styled from "styled-components";

interface Props {}

export const Section = styled.section<Props>`
  flex: 1;
  border-left: 1px solid rgb(var(--stroke));
  min-width: 340px;
  max-width: 340px;
`;
