import styled from "styled-components";

interface Props {
  isMobile: boolean | null;
}

export const Container = styled.div<Props>`
  max-width: ${(props) => (props.isMobile ? "" : "470px")};
  width: 100%;
`;
