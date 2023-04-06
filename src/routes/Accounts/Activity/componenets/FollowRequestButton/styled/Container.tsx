import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  cursor: pointer;
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  min-height: 44px;
  box-sizing: content-box;
`;
