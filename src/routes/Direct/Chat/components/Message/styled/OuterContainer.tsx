import styled from "styled-components";

interface Props {
  isViewer: boolean;
}

export const OuterContainer = styled.div<Props>`
  flex-direction: row;
  justify-content: ${(props) => (props.isViewer ? "flex-end" : "flex-start")};
`;
