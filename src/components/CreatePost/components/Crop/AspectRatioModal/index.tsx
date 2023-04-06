import React, { useContext, useEffect } from "react";
import { Button } from "../styled";
import { Container, Menu, MenuButton, Padding, Text } from "./styled";
import { ReactComponent as ExpandSvg } from "../../../../../assets/svgs/expand.svg";
import { ReactComponent as PhotoSvg } from "../../../../../assets/svgs/photo.svg";
import { ReactComponent as SquareSvg } from "../../../../../assets/svgs/square.svg";
import { ReactComponent as PortraitSvg } from "../../../../../assets/svgs/portrait.svg";
import { ReactComponent as LandscapeSvg } from "../../../../../assets/svgs/landscape.svg";
import { MenuStateAction, MenuStateType } from "..";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../../context/CreatePostContext";

interface Props {
  menuState: MenuStateType;
  menuDispatch: React.Dispatch<MenuStateAction>;
}

export const AspectRatioModal: React.FC<Props> = ({
  menuDispatch,
  menuState,
}) => {
  const { setSelectedAspectRatio, selectedAspectRatio } = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  useEffect(() => {
    if (!menuState.isRatioMenuOpen) return;

    const closeMenu = () => menuDispatch({ type: "animate", payload: true });

    window.addEventListener("click", closeMenu);
    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [menuState.isRatioMenuOpen]);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menuDispatch({
      type: menuState.isRatioMenuOpen ? "animate" : "visible-ratio",
      payload: true,
    });
  };

  return (
    <Container>
      {menuState.isRatioMenuOpen && (
        <Padding
          isAnimating={menuState.isMenuAnimating}
          onAnimationEnd={() =>
            menuState.isMenuAnimating &&
            menuDispatch({ type: "reset", payload: false })
          }
          onClick={(e) => e.stopPropagation()}
        >
          <Menu>
            <MenuButton onClick={() => setSelectedAspectRatio("original")}>
              <Text selected={selectedAspectRatio === "original"}>
                Original
              </Text>
              <PhotoSvg
                stroke={
                  selectedAspectRatio === "original" ? "#ffffff" : "#8e8e8e"
                }
                fill={
                  selectedAspectRatio === "original" ? "#ffffff" : "#8e8e8e"
                }
              />
            </MenuButton>
            <MenuButton onClick={() => setSelectedAspectRatio("1:1")}>
              <Text selected={selectedAspectRatio === "1:1"}>1:1</Text>
              <SquareSvg
                fill={selectedAspectRatio === "1:1" ? "#ffffff" : "#8e8e8e"}
              />
            </MenuButton>
            <MenuButton onClick={() => setSelectedAspectRatio("4:5")}>
              <Text selected={selectedAspectRatio === "4:5"}>4:5</Text>
              <PortraitSvg
                fill={selectedAspectRatio === "4:5" ? "#ffffff" : "#8e8e8e"}
              />
            </MenuButton>
            <MenuButton onClick={() => setSelectedAspectRatio("16:9")}>
              <Text selected={selectedAspectRatio === "16:9"}>16:9</Text>
              <LandscapeSvg
                fill={selectedAspectRatio === "16:9" ? "#ffffff" : "#8e8e8e"}
              />
            </MenuButton>
          </Menu>
        </Padding>
      )}

      <Button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={clickHandler}
        isOpen={menuState.isRatioMenuOpen}
        isOtherOpen={menuState.isZoomMenuOpen || menuState.isGalleryMenuOpen}
      >
        <ExpandSvg fill={menuState.isRatioMenuOpen ? "#262626" : "#ffffff"} />
      </Button>
    </Container>
  );
};
