import styled from "styled-components";

interface ButtonProps {
  margin?: string;
}

export const Button = styled.button<ButtonProps>`
  border: 0;
  color: #0095f6;
  color: rgba(var(--d69, 0, 149, 246), 1);
  display: flex;
  padding: 0;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: inherit;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto;
  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;
