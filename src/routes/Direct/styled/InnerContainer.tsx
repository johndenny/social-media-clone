import styled from "styled-components";

interface IContainer {
  isMobile: boolean | null;
}

export const InnerContainer = styled.div<IContainer>`
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  flex-grow: 1;
  flex-direction: row;
  justify-content: stretch;
  align-self: center;
  ${(props) =>
    !props.isMobile && {
      maxWidth: "935px",
      border: "1px solid rgb(219, 219, 219)",
      borderRadius: "3px",
      margin: "24px auto",
    }}
  overflow: hidden;
`;
