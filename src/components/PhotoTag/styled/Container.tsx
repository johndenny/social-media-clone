import styled from "styled-components";

interface Props {
  left: number;
  paddingBottom: number;
  paddingTop: number;
  top: number;
  transformTranslate: { x: number; y: number };
}

export const Container = styled.div.attrs<Props>((props) => ({
  style: {
    left: `${props.left}%`,
    paddingBottom: `${props.paddingBottom}px`,
    paddingTop: `${props.paddingTop}px`,
    top: `${props.top}%`,
    transform: `translate(${props.transformTranslate.x}%, ${props.transformTranslate.y}%)`,
  },
}))<Props>`
  position: absolute;
  z-index: 2;
  cursor: grab;
  :active {
    cursor: grabbing;
  }
`;
