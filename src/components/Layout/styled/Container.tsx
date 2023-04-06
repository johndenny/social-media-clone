import styled from "styled-components";

interface IContainer {
  isMobile: boolean | null;
  isModal: boolean;
}

export const Container = styled.main<IContainer>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
  background-color: rgb(
    var(
      ${(props) =>
        props.isMobile ? "--primary-background" : "--secondary-background"}
    )
  );
`;
