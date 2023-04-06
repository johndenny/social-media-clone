import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  border-top: 1px solid rgb(219, 219, 219);
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 1px;
  text-align: center;
  @media (min-width: 736px) {
    gap: 60px;
  }
  @media (max-width: 735px) {
    position: sticky;
    width: 100%;
    z-index: 3;
    top: 44px;
    border-bottom: 1px solid rgb(219, 219, 219);
    background-color: rgb(var(--primary-background));
  }
`;
