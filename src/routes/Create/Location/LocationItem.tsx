import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationAddressI, LocationI } from ".";
import { useCreateContext } from "..";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../context/CreatePostContext";
import { Container, Span } from "./styled";

interface Props {
  location: LocationI;
}

export const LocationItem: React.FC<Props> = ({ location }) => {
  const navigate = useNavigate();
  const mobileCreateContext = useCreateContext();
  const wideCreateContext = useContext(CreatePostContext);
  const { city, town, village, state, country } = location.address;
  const name = location.namedetails["name:en"] || location.namedetails.name;
  const cityOrTown = city || town || village;
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const titleHandler = () => {
      let title = name;
      if (country !== name) title = `${name}, ${country}`;
      if (state && state !== name) title = `${name}, ${state}`;
      if (cityOrTown && cityOrTown !== name) title = `${name}, ${cityOrTown}`;

      setTitle(title);
    };

    const addressHandler = () => {
      if (name === state || name === country) return;
      const addressKeys = [
        "house_number",
        "road",
        "city",
        "town",
        "state",
        "country",
      ];
      const addressArray = Object.keys(location.address)
        .map((key) => {
          const keyData = location.address[key as keyof LocationAddressI];
          const isKeeper = addressKeys.includes(key);
          return isKeeper ? keyData : null;
        })
        .filter((key) => key !== null);

      setAddress(addressArray.join(", "));
    };
    titleHandler();
    addressHandler();
  }, []);

  const onClickHandler = () => {
    const context = wideCreateContext || mobileCreateContext;
    context.setPostLocation({
      lat: location.lat,
      lon: location.lon,
      id: location.place_id,
      address,
      name: title,
    });

    navigate(-1);
  };

  return (
    <Container onClick={onClickHandler}>
      <Span style={{ fontWeight: "600" }}>{title}</Span>
      <Span style={{ color: "rgb(var(--secondary-text))" }}>{address}</Span>
    </Container>
  );
};
