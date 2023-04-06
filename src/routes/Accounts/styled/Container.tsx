import styled from "styled-components";

interface IContainer {
  isMobile?: boolean | null;
}

export const Container = styled.div<IContainer>`
  background-color: rgb(255, 255, 255);

  max-width: ${(props) => (props.isMobile ? "609px" : "935px")};
  @media (max-width: 736px) {
    max-width: 409px;
  }

  width: 100%;
  flex-grow: 1;
  flex-direction: row;
  justify-content: stretch;
  align-self: center;
  border: ${(props) => (props.isMobile ? "0" : "1px solid rgb(219, 219, 219)")};
  border-radius: ${(props) => (props.isMobile ? "0" : "3px")};
  margin: ${(props) => (props.isMobile ? "0" : "24px auto")};
`;
