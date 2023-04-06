import styled from "styled-components";

interface Props {
  isViewer: boolean;
  isReply?: boolean;
}

export const ContentContainer = styled.div<Props>`
  background: rgb(
    var(
      ${(props) =>
        props.isViewer ? "--highlight-background" : "--primary-background"}
    )
  );
  border: 1px solid rgb(var(--highlight-background));
  border-radius: 22px;
  overflow: hidden;
  align-self: flex-end;
  max-width: ${(props) => (props.isReply ? "200px" : "236px")};
  transform: ${(props) => (props.isReply ? "scale(.85)" : null)};
`;
