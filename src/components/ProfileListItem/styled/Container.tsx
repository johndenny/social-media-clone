import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 16px;
  min-width: 0;
  overflow: hidden;
`;
