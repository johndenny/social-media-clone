import styled from "styled-components";

interface Props {
  isRead: boolean;
}

export const TitleText = styled.span<Props>`
  font-weight: ${(props) => (props.isRead ? "400" : "600")};
  color: ${(props) => (props.isRead ? null : "rgb(var(--primary-text))")};
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  overflow-x: hidden;
`;
