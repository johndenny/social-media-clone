import styled from "styled-components";

interface Props {
  isFocused: boolean;
}

export const TextContainer = styled.div<Props>`
  align-items: center;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  left: ${(props) => (props.isFocused ? 0 : "50%")};
  max-width: 100%;
  padding: 0 8px;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: ${(props) => (props.isFocused ? null : "translateX(-50%)")};
  transition: left 0.15s ease-out, transform 0.15s ease-out;
  color: rgb(var(--secondary-text));
  font-size: 14px;
  line-height: 28px;
  font-weight: normal;
  gap: 5px;
`;
