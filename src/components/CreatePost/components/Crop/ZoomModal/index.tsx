import React, { ChangeEvent, useEffect } from "react";
import { Button } from "../styled";
import { Container, SliderContainer, Slider } from "./styled";
import { ReactComponent as ZoomSvg } from "../../../../../assets/svgs/zoom.svg";
import { Menu, Padding } from "../AspectRatioModal/styled";
import { PhotoMovementValuesType } from "../../../../../hooks/usePhotoMovement";
import { MenuStateAction, MenuStateType } from "..";

interface Props {
  values: PhotoMovementValuesType;
  handleZoom: (e: ChangeEvent<HTMLInputElement>) => void;
  menuState: MenuStateType;
  menuDispatch: React.Dispatch<MenuStateAction>;
}

export const ZoomModal: React.FC<Props> = ({
  values,
  handleZoom,
  menuState,
  menuDispatch,
}) => {
  useEffect(() => {
    if (!menuState.isZoomMenuOpen) return;

    const closeMenu = () => menuDispatch({ type: "animate", payload: true });

    window.addEventListener("click", closeMenu);
    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [menuState.isZoomMenuOpen]);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menuDispatch({
      type: menuState.isZoomMenuOpen ? "animate" : "visible-zoom",
      payload: true,
    });
  };

  return (
    <Container>
      {menuState.isZoomMenuOpen && (
        <Padding
          isAnimating={menuState.isMenuAnimating}
          onAnimationEnd={() =>
            menuState.isMenuAnimating &&
            menuDispatch({ type: "reset", payload: false })
          }
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Menu>
            <SliderContainer>
              <Slider
                style={{
                  backgroundImage: `
                linear-gradient(
                    to right,
                    rgb(255, 255, 255) 0%,
                    rgb(255, 255, 255) ${values.zoom}%,
                    rgb(0, 0, 0) ${values.zoom}%,
                    rgb(0, 0, 0) 100%
                )`,
                }}
                type="range"
                max={100}
                min={0}
                onChange={handleZoom}
                value={values.zoom}
              />
            </SliderContainer>
          </Menu>
        </Padding>
      )}

      <Button
        isOtherOpen={menuState.isRatioMenuOpen || menuState.isGalleryMenuOpen}
        isOpen={menuState.isZoomMenuOpen}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={clickHandler}
      >
        <ZoomSvg fill={menuState.isZoomMenuOpen ? "#262626" : "#ffffff"} />
      </Button>
    </Container>
  );
};
