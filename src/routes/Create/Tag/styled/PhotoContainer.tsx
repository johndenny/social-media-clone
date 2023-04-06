import styled from "styled-components";

interface Props {
  aspectRatio: number;
}

export const PhotoContainer = styled.div<Props>`
  justify-content: center;

  &:after {
    content: "";
    display: block;
    padding-bottom: ${(props) =>
      props.aspectRatio < 1 ? `${100 / props.aspectRatio}%` : "100%"};
  }
`;
