import styled from "styled-components";

interface Props {}

export const PostContainer = styled.div<Props>`
  flex-direction: row;
  border-top: 1px solid rgb(var(--stroke));
  border-bottom: 1px solid rgb(var(--stroke));
  height: 130px;
`;
