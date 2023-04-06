import styled from "styled-components";

interface Props {
  translateX: number;
}

export const UnorderedList = styled.ul.attrs<Props>((props) => ({
  style: {
    transform: `translateX(-${props.translateX}px)`,
  },
}))<Props>`
  display: flex;
`;
