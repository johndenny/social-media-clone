import styled from "styled-components";

interface Props {
  mobileNavigation: boolean | null;
}

export const Container = styled.div<Props>`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  z-index: 500;
  margin-bottom: ${(props) => (props.mobileNavigation ? "44px" : null)};
`;
