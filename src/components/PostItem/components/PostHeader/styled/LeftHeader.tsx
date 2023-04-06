import styled from "styled-components";

interface Props {
  isMobile: boolean | null | undefined;
}

export const LeftHeader = styled.div<Props>`
  flex-direction: row;
  padding: ${(props) =>
    props.isMobile ? "14px 0 14px 14px" : "12px 0 12px 12px"};
  flex: 1;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  min-width: 0;
`;
