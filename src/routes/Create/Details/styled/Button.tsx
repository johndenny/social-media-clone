import styled from "styled-components";

interface Props {
  isPostLocation?: boolean;
}

export const Button = styled.button<Props>`
  align-items: center;
  background-color: rgb(var(--primary-background));
  border-bottom: 1px solid rgb(var(--stroke));
  border-left: none;
  border-right: none;
  border-top: 1px solid rgb(var(--stroke));
  color: rgb(var(--primary-text));
  display: flex;
  flex-direction: row;
  font-size: 16px;
  height: ${(props) => (props.isPostLocation ? "60px" : "44px")};
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 16px;
  width: 100%;
`;
