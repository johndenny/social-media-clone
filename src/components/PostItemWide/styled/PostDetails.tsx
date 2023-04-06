import styled from "styled-components";

interface Props {
  isModal: boolean | undefined;
}

export const PostDetails = styled.div<Props>`
  ${(props) =>
    !props.isModal && {
      width: "335px",
    }}
  ${(props) => props.isModal && { maxWidth: "500px", flex: "1" }}

  border-left: 1px solid rgb(var(--highlight-background));
  background-color: rgb(var(--primary-background));
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
`;
