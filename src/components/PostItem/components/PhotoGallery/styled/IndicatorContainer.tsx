import styled from "styled-components";

interface Props {
  isWide?: boolean;
}

export const IndicatorContainer = styled.div<Props>`
  bottom: 0;
  left: 50%;
  transform: translateX(-50%)
    ${(props) => (props.isWide ? undefined : "translateY(100%)")};
  position: absolute;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
