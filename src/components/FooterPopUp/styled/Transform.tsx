import styled from "styled-components";

interface ITransform {
  isHidden: boolean;
}

export const Transfrom = styled.div<ITransform>`
  -webkit-transform: ${(props) => {
    return props.isHidden ? "translateY(100%)" : "translateY(0)";
  }};
  transform: ${(props) => {
    return props.isHidden ? "translateY(100%)" : "translateY(0)";
  }};
  -webkit-transition: -webkit-transform 0.2s ease-out;
  transition: transform 0.2s ease-out;
  transition: transform 0.2s ease-out, -webkit-transform 0.2s ease-out;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-width: 200px;
`;
