import styled from "styled-components";

interface Props {
  isRepliesVisible: boolean;
}

export const RepliesContainer = styled.div<Props>`
  display: ${(props) => (props.isRepliesVisible ? null : "none")};
`;
