import React from "react";
import { CollectionI } from "../../components/CollectionItem";
import { Header, NavigationButton, Title, TitleText } from "./styled";
import { ReactComponent as ChevronSvg } from "../../../../../assets/svgs/chevron.svg";
import { ReactComponent as OptionsDotsSvg } from "../../../../../assets/svgs/optionsDots.svg";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../../context/GlobalContext";

interface Props {
  collection?: CollectionI;
}

export const CollectionHeader: React.FC<Props> = ({ collection }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  return (
    <Header>
      <NavigationButton onClick={() => navigate(`/${params.username}/saved/`)}>
        <span style={{ transform: "rotate(-90deg)" }}>
          <ChevronSvg fill="rgb(var(--secondary-text))" />
        </span>
        <span style={{ fontWeight: 600, color: "rgb(var(--secondary-text))" }}>
          Saved
        </span>
      </NavigationButton>
      <Title>
        <TitleText>{collection?.name || "All Posts"}</TitleText>
        {collection && (
          <button
            onClick={() =>
              setModalAttrs({
                type: "collection-options",
                variables: { id: params?.collectionId || "" },
              })
            }
          >
            <OptionsDotsSvg height={24} width={24} />
          </button>
        )}
      </Title>
    </Header>
  );
};
