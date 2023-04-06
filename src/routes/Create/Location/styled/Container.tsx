import styled from "styled-components";

interface Props {}

export const Container = styled.button<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 16px;
  height: 50px;
  border-bottom: 1px solid rgb(var(--stroke));
  white-space: nowrap;
`;
