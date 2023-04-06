import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-bottom: 1px solid rgb(var(--stroke));
  height: 44px;
`;
