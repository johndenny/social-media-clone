import styled from "styled-components";

interface Props {
  isLiked: boolean;
}

export const MarginContainer = styled.div<Props>`
  flex-direction: row;
  margin-bottom: ${(props) => (props.isLiked ? "20px" : "8px")};
`;
