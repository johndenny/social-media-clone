import styled from "styled-components";

interface Props {
  topLeft: string;
  padding: string;
}

export const BottomPhoto = styled.div<Props>`
  position: absolute;
  top: ${(props) => props.topLeft};
  left: ${(props) => props.topLeft};
  padding: ${(props) => props.padding};
  background-color: rgb(var(--primary-background));
  border-radius: 50%;
`;
