import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

export const Title = styled.h2<Props>`
  text-transform: capitalize;
  font-weight: ${(props) => (props.isSelected ? "500" : "400")};
  font-size: 12px;
  color: rgb(
    var(
      ${(props) => (props.isSelected ? "--primary-button" : "--secondary-text")}
    )
  );
  margin: 8px 0 16px 0;
`;
