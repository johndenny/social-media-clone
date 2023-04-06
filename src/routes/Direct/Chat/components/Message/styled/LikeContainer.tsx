import styled from "styled-components";

interface Props {
  isViewer: boolean;
}

export const LikeContainer = styled.div<Props>`
  background-color: rgb(var(--highlight-background));
  border: 2px solid rgb(var(--primary-background));
  border-radius: 20px;
  padding: 6px;
  position: absolute;
  bottom: 4px;
  ${(props) => (props.isViewer ? "right: 0" : "left: 0")};
  font-size: 12px;
  flex-direction: row;
  gap: 4px;
  z-index: 1;
`;
