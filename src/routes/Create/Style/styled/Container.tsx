import styled from "styled-components";

interface Props {
  hidden: boolean;
}

export const Container = styled.div<Props>`
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  left: 0;
  margin-bottom: 44px;
  position: absolute;
  right: 0;
  top: 0;
`;
