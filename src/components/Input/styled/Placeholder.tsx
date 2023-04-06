import styled from "styled-components";

interface IPlaceholder {
  value: boolean;
}

export const Placeholder = styled.span<IPlaceholder>`
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: #8e8e8e;
  color: rgba(var(--f52, 142, 142, 142), 1);
  font-size: 14px;
  left: 0;
  margin: 3px 9px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-overflow: ellipsis;
  -webkit-transform-origin: left;
  transform-origin: left;
  -webkit-transition: -webkit-transform ease-out 0.1s;
  transition: -webkit-transform ease-out 0.1s;
  transition: transform ease-out 0.1s;
  transition: transform ease-out 0.1s, -webkit-transform ease-out 0.1s;
  white-space: nowrap;
  transform: ${(props) =>
    props.value ? "scale(.714) translateY(-16px)" : null};
`;
