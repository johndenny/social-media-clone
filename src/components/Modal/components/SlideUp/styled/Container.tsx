import styled from "styled-components";

interface Props {
  transformY: number;
  transition: boolean;
}

export const Container = styled.div.attrs<Props>((props) => ({
  style: {
    transform: `translateY(${props.transformY}px)`,
    transition: `${props.transition ? "transform 0.3s ease 0s" : null}`,
  },
}))<Props>`
  width: 100%;
  background-color: rgb(var(--primary-background));
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;
