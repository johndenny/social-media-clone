import styled from "styled-components";

interface Props {
  isWide: boolean;
}

export const Container = styled.div<Props>`
  padding: ${(props) => (props.isWide ? 20 : 16)}px;
  border: 1px solid rgb(var(--stroke));
  border-radius: 4px;
  align-items: center;
  gap: ${(props) => (props.isWide ? 8 : 4)}px;
  width: 100%;
  background-color: rgb(var(--primary-background));
`;
