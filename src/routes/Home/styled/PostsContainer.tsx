import styled from "styled-components";

interface Props {
  isMobile: boolean | null;
  isFetching: boolean;
}

export const PostContainer = styled.div<Props>`
  max-width: ${(props) => (props.isMobile ? "600px" : "470px")};
  margin: ${(props) => (props.isMobile ? "0 auto" : null)};
  width: 100%;
  transform: translateY(${(props) => (props.isFetching ? "56px" : "")});
  transition: transform 0.3s ease-in-out;

  @media (min-width: 600px) {
    margin-top: 24px;
    gap: 12px;
  }
`;
