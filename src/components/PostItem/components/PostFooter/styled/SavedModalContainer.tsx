import styled from "styled-components";

interface Props {
  isFlipped: boolean | 0 | null;
}

export const SavedModalContainer = styled.div<Props>`
  ${(props) =>
    props.isFlipped
      ? {
          bottom: "-50px",
        }
      : { top: "-10px" }}

  align-items: center;
`;
