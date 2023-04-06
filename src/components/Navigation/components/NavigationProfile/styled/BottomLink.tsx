import styled from "styled-components";

interface Props {}

export const BottomLink = styled.div<Props>`
  border-top: 1px solid rgb(var(--stroke));
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
`;
