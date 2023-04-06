import styled from "styled-components";

interface Props {
  isWide: boolean;
}

export const CommentListContainer = styled.ul<Props>`
  flex: 1;
  display: flex;
  flex-direction: ${(props) => (props.isWide ? "column" : "column-reverse")};
  justify-content: ${(props) => !props.isWide && "flex-end"};
  list-style-type: none;
  gap: 16px;
`;
