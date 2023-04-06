import styled from "styled-components";

interface Props {
  selected?: boolean;
  isWide?: boolean;
}

export const StepIndicator = styled.div<Props>`
  background-color: rgb(
    var(
      ${(props) =>
        props.isWide
          ? props.selected
            ? "--primary-background"
            : "--focus-stroke"
          : props.selected
          ? "--primary-button"
          : "--focus-stroke"}
    )
  );
  border-radius: 50%;
  height: 6px;
  width: 6px;
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.selected ? undefined : "0.7")};
`;
