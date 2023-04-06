import styled from "styled-components";

interface Props {
  isClicked: boolean;
}

export const Recipient = styled.div<Props>`
  flex-direction: row;
  align-items: center;
  height: 35px;
  padding: 0 8px;
  gap: 8px;
  background-color: rgb(
    var(
      ${(props) => (props.isClicked ? "--primary-button" : "--secondary-blue")}
    )
  );
  border-radius: 4px;
  color: rgb(
    var(
      ${(props) =>
        props.isClicked ? "--primary-background" : "--primary-button"}
    )
  );
`;
