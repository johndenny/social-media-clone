import styled from "styled-components";

interface Props {}

export const SelectButton = styled.button<Props>`
  display: inline-block;
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  :hover {
    opacity: 0.7;
  }
`;
