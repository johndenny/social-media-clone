import styled from "styled-components";

interface Props {
  selected: boolean;
}

export const Button = styled.button<Props>`
  align-items: center;
  justify-content: center;
  background: None;
  border: None;
  border-top: 1px solid
    ${(props) =>
      props.selected ? "rgb(var(--primary-text))" : "rgba(0, 0, 0, 0.0975)"};
  color: rgb(
    var(${(props) => (props.selected ? "--primary-text" : "--secondary-text")})
  );
  display: flex;
  flex-grow: 1;
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  height: 100%;
`;
