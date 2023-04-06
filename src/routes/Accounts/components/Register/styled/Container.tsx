import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  max-width: 350px;
  align-self: center;
  @media (max-width: 450px) {
    justify-content: flex-start;
  }
`;
