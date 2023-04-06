import styled from "styled-components";

interface Props {
  selected: boolean;
}

export const Text = styled.span<Props>`
  color: rgb(
    var(
      ${(props) =>
        props.selected ? "--primary-background" : "--secondary-text"}
    )
  );
  font-weight: 600;
`;
