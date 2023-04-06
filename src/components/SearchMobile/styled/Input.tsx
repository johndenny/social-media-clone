import styled from "styled-components";

interface Props {
  isFocused: boolean;
}

export const Input = styled.input<Props>`
  -webkit-appearance: none;
  background-color: rgb(var(--primary-background));
  line-height: 20px;
  outline: none;
  border: 1px solid
    rgb(var(${(props) => (props.isFocused ? "--focus-stroke" : "--stroke")}));
  border-radius: 6px;
  color: rgb(var(--primary-text));
  flex-grow: 1;
  font-size: 14px;
  margin: 0;
  overflow: visible;
  padding: 4px 12px 4px 22px;
`;
