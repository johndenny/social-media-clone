import styled from "styled-components";

interface IContainer {
  isMobile: boolean | null;
}

export const Container = styled.div<IContainer>`
  width: 100%;
  flex-grow: 1;
  flex-direction: row;
  ${(props) =>
    !props.isMobile && {
      padding: "24px 16px",
    }}
`;
