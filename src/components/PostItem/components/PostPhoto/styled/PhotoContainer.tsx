import styled from "styled-components";

interface Props {
  width?: number;
}

export const PhotoContainer = styled.div.attrs<Props>((props) => ({
  style: {
    maxWidth: `${props.width ? props.width : null}px`,
  },
}))<Props>`
  min-height: 450px;
  flex-grow: 1;
  background-color: rgb(
    ${(props) => (props.width ? "0, 0, 0" : "var(--secondary-background)")}
  );
  justify-content: center;
`;
