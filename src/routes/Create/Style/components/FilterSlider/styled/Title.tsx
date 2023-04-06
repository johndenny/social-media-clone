import styled from "styled-components";

interface Props {
  selected: boolean;
}

export const Title = styled.div<Props>`
  color: var(--secondary-text);
  font-size: 12px;
  line-height: 16px;
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  text-align: center;
  text-transform: capitalize;
`;
