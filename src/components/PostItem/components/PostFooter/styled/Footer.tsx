import styled from "styled-components";

interface Props {
  isMobile: boolean | null | undefined;
}

export const Footer = styled.footer<Props>`
  padding: ${(props) => (props.isMobile ? "12px 16px 16px" : "4px 12px 12px")};
  gap: 8px;
`;
