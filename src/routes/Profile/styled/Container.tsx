import styled from "styled-components";

interface Props {
  isModal?: boolean;
}

export const Container = styled.div<Props>`
  margin-bottom: 0;
  max-width: 935px;
  width: 100%;

  @media (min-width: 736px) {
    ${(props) =>
      !props.isModal && {
        boxSizing: "content-box",
        margin: "24px auto 0",
        width: "calc(100% - 40px)",
      }}
  }
`;
