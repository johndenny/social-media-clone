import styled from "styled-components";

interface IImage {
  current: boolean;
  previous: boolean;
}

export const Image = styled.img<IImage>`
  height: 538.84px;
  left: 0;
  opacity: ${(props) => (props.current ? 1 : 0)};
  position: absolute;
  top: 0;
  visibility: ${(props) =>
    props.current || props.previous ? "visable" : "hidden"};
  width: 250px;
  z-index: ${(props) => (props.current ? 2 : null)};
  transition: ${(props) =>
    props.current || props.previous ? "opacity 1.5s ease-out" : null};
`;
