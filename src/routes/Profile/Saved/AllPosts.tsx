import React, { useEffect } from "react";
import { Saved } from ".";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { Container } from "../styled";
import { CollectionHeader } from "./Collection/CollectionHeader";

interface Props {}

export const AllPosts: React.FC<Props> = () => {
  const { setHeaderAttrs, isMobile } = useGlobalContext() as globalContextType;

  useEffect(() => {
    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "All Posts",
    });
  }, []);

  return (
    <Container>
      {!isMobile && <CollectionHeader />}
      <Saved isSaved={true} />
    </Container>
  );
};
