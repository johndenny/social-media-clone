import React, { useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { ReactComponent as SplashScreenSvg } from "../../../assets/svgs/splashScreen.svg";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Container, Header } from "../Tags/styled";
import { Span } from "../../../components/ProfilePhoto/styled";
import { ReactComponent as LocationMarkerSvg } from "../../../assets/svgs/locationMarker.svg";
import { HeaderSecondary } from "../Tags/styled/HeaderSecondary";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { PageContainer } from "../../Profile/styled";
import { PhotoGridPage } from "../../../components/PhotoGrid/PhotoGridPage";
import { UniqueLocation } from "../../../graphQL/queries";
import useWindowSize from "../../../hooks/useWindowSize";
import { Title } from "./styled";

interface Props {}

export const Locations: React.FC<Props> = () => {
  const { width } = useWindowSize();
  const params = useParams();
  const { isMobile, setHeaderAttrs, resultLocation, queryVarsDispatch } =
    useGlobalContext() as globalContextType;
  const { data } = resultLocation;

  const { scrollDispatch, scrollState, scrollRef } = useInfinitePagination({
    limit: 16,
  });

  useLayoutEffect(() => {
    if (!data) return;

    document.title = `${data.location.name} • Instagram`;

    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: data.location.name,
    });
  }, [data]);

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.location,
        variables: {
          locationId: Number(params.locationId),
          limit: 12,
          skip: 0,
        },
      },
    });
  }, []);

  if (!resultLocation.data) return <SplashScreenSvg />;

  return (
    <>
      <div style={{ display: "block", height: "200px", zIndex: 3 }}>
        <MapContainer
          style={{ height: "100%" }}
          center={[
            Number(resultLocation.data.location.lat),
            Number(resultLocation.data.location.lon),
          ]}
          zoom={11}
          scrollWheelZoom={false}
          zoomControl={false}
          dragging={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[
              Number(resultLocation.data.location.lat),
              Number(resultLocation.data.location.lon),
            ]}
          ></Marker>
        </MapContainer>
      </div>
      <Container>
        <Header style={width > 735 ? {} : { justifyContent: "center" }}>
          <Span height={width > 735 ? "152px" : "77px"}>
            <LocationMarkerSvg />
          </Span>
          {!isMobile && <Title>{resultLocation.data.location.name}</Title>}
        </Header>
        <HeaderSecondary>Most Recent</HeaderSecondary>
        <PageContainer ref={scrollRef}>
          {scrollState.moreVars.map((vars, index) => {
            return (
              <PhotoGridPage
                key={index + vars.skip}
                variables={{ ...vars, locationId: Number(params.locationId) }}
                scrollDispatch={scrollDispatch}
                query={UniqueLocation}
                queryName={"location"}
                pageName={"pagedPosts"}
              />
            );
          })}
        </PageContainer>
      </Container>
    </>
  );
};
