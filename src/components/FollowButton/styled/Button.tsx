import styled from "styled-components";

interface Props {
  isHomepage?: boolean;
  isFollowing?: boolean;
}

export const Button = styled.button<Props>`
  color: rgb(
    var(
      ${(props) => (!props.isFollowing ? "--primary-button" : "--primary-text")}
    )
  );
  font-weight: 600;
  ${(props) => props.isHomepage && { fontSize: "12px" }}
  min-width: 32px;
`;
