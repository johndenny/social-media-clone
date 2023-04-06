import styled from "styled-components";

interface Props {
  isWide: boolean;
  isMobile: boolean | null;
}

export const Section = styled.section<Props>`
  background-color: rgb(var(--secondary-background));
  padding: ${(props) => (props.isWide ? 20 : 12)}px 0;
  border: 1px solid rgb(var(--stroke));
  gap: 12px;
  @media (min-width: 600px) {
    background-color: rgb(var(--primary-background));
    border-radius: 8px;
  }
`;
