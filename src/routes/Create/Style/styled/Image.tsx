import styled from "styled-components";

interface Props {
  url: string | undefined;
  height: number;
  left: number;
  top: number;
  width: number;
  rotate: number;
  origin: { x: number; y: number };
  transition: boolean;
}

export const Image = styled.div.attrs<Props>((props) => ({
  style: {
    backgroundImage: `url(${props.url})`,
    height: `${props.height}%`,
    width: `${props.width}%`,
    left: `${props.left}%`,
    top: `${props.top}%`,
    transform: `rotate(${props.rotate}deg)`,
    transformOrigin: `${props.origin.x}% ${props.origin.y}%`,
    transition: `${props.transition ? "all 0.2s ease 0s" : null}`,
  },
}))<Props>`
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  will-change: height, left, top, width, transform;
`;
