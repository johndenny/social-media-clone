import styled from "styled-components";

interface Props {
  isViewer: boolean;
}

export const Container = styled.div<Props>`
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${(props) => (props.isViewer ? "flex-end" : "flex-start")};
  min-height: 44px;
`;
