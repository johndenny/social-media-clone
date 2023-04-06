import React from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import { NavigationButtons } from "../Crop/NavigationButtons";
import { SideMenu } from "./SideMenu";
import { Canvas, CanvasContainer, Container } from "./styled";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const Filter: React.FC<Props> = ({ canvasRef }) => {
  const { width, height } = useWindowSize();

  const maxWidthHandler = () => {
    if (width < 855 + 340 + 40) return width - 340 - 40;
    return height - 88 > 855 ? 855 : height - 88;
  };

  return (
    <Container>
      <CanvasContainer style={{ maxWidth: `${maxWidthHandler()}px` }}>
        <NavigationButtons />
        <Canvas ref={canvasRef}></Canvas>
      </CanvasContainer>
      <SideMenu />
    </Container>
  );
};
