import styled from "styled-components";

interface Props {
  error: boolean;
}

export const CounterText = styled.span<Props>`
  font-size: 12px;
  color: rgb(var(${(props) => (props.error ? "--error" : "--secondary-text")}));
  font-weight: ${(props) => props.error && "600"};
  margin-bottom: 16px;
`;
