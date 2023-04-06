import styled from "styled-components";

interface Props {
  isModal?: boolean;
}

export const Container = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3px;
  @media (min-width: 736px) {
    ${(props) =>
      !props.isModal && {
        gap: "27px",
      }}
  }
`;
