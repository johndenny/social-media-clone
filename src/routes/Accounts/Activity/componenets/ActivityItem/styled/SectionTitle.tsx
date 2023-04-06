import styled from "styled-components";

interface Props {}

export const SectionTitle = styled.div<Props>`
  font-weight: 600;
  padding-top: 8px;
  padding-left: 12px;
  justify-content: flex-start;
  align-items: flex-start;
  border-top: 1px solid rgb(var(--stroke));
`;
