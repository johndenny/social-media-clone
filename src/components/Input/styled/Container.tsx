import styled from "styled-components";

interface IContainer {
  isFocused: boolean;
  errorMessage?: string;
  Type: string;
  margin?: string;
}

export const Container = styled.div<IContainer>`
  align-items: center;
  -webkit-appearance: none;
  background: #fafafa;
  background: rgba(var(--b3f, 250, 250, 250), 1);
  border: 1px solid #dbdbdb;
  border: ${(props) => {
    if (
      props.errorMessage &&
      (props.Type === "password" ? true : !props.isFocused)
    )
      return "1px solid rgba(var(--i30,237,73,86),1)";
    if (props.isFocused) return "1px solid rgba(var(--ca6, 168, 168, 168), 1)";

    return "1px solid rgba(var(--ca6, 219, 219, 219), 1)";
  }};
  border-radius: 6px;
  box-sizing: border-box;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  display: flex;
  flex-direction: row;
  font-size: 14px;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: ${(props) => (props.margin ? props.margin : null)};
`;
