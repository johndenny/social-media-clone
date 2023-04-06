import styled from "styled-components";

interface Props {}

export const RangeInput = styled.input<Props>`
  appearance: none;
  background-color: rgb(var(--stroke));
  outline: none;
  width: 100%;
  height: 2px;
  margin: 0;
  ::-webkit-slider-thumb {
    appearance: none;
    background-color: rgb(var(--primary-text));
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;
