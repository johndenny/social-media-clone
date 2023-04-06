import styled from "styled-components";

interface Props {}

export const Slider = styled.input<Props>`
  height: 1px;
  outline: none;
  appearance: none;
  width: 100%;
  ::-webkit-slider-thumb {
    width: 16px;
    -webkit-appearance: none;
    height: 16px;
    border-radius: 50%;
    background: rgb(var(--primary-background));
  }
`;
