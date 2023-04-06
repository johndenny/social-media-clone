import styled from "styled-components";

interface Props {
  height: number;
}

export const Image = styled.img<Props>`
  height: ${(props) => props.height}px;
`;
