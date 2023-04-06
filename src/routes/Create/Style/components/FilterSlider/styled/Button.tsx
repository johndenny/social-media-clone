import styled from "styled-components";

interface Props {}

export const Button = styled.button<Props>`
  align-items: center;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  outline: none;
  gap: 10px;
`;
