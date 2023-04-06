import styled from "styled-components";

interface Props {
  isViewer: boolean;
}

export const ReplyContainer = styled.div<Props>`
  align-items: ${(props) => (props.isViewer ? "flex-end" : "flex-start")};
  margin-bottom: 4px;
`;
