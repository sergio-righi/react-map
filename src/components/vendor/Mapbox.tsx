import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useRef, useState } from "react";
import Map, { MapRef } from "react-map-gl";
import { IMarker } from "interfaces";
import { Vendor } from "components";
import { Coordinate } from "types";
import { Constants, Enums, Geocoder } from "utils";

type Props = {
  zoom?: number;
  layers?: boolean;
  markers?: IMarker[];
  drawing?: boolean;
  draggable?: boolean;
  coordinate?: Coordinate;
  status?: string;
  filters: string[];
  onClick?: (marker: IMarker) => void;
  onUpdate?: (marker: IMarker) => void;
  onAdd?: (coordinate: Coordinate, address: string) => void;
  onDelete?: (id: string, savedListId: string | null) => void;
  onListChange: (
    markerId: string,
    newSavedListId: string,
    oldSavedListId: string | null
  ) => void;
  onListCreate: (id: string) => void;
};

export const Mapbox = ({
  filters = [],
  layers = false,
  drawing = false,
  draggable = false,
  ...props
}: Props) => {
  const mapInstanceRef = useRef<MapRef | null>(null);
  const [viewMode, setViewMode] = useState<Enums.EnumMapboxLayer>(
    Enums.EnumMapboxLayer.Satellite
  );
  const [viewport, setViewport] = useState<Coordinate>({
    lat: props.coordinate?.lat ?? Constants.MAPBOX.LATITUDE,
    lng: props.coordinate?.lng ?? Constants.MAPBOX.LONGITUDE,
  });

  useEffect(() => {
    if (props.coordinate) handleFlyTo();
  }, [props.coordinate]);

  const mapStyle =
    viewMode === Enums.EnumMapboxLayer.Street
      ? "mapbox://styles/mapbox/streets-v12"
      : "mapbox://styles/mapbox/satellite-v9";

  function handleFlyTo() {
    const map = mapInstanceRef.current;

    if (map && props.coordinate) {
      if (draggable) setViewport(props.coordinate);
      map.jumpTo({
        center: [props.coordinate.lng, props.coordinate.lat], // New latitude and longitude
        zoom: props.zoom ?? Constants.MAPBOX.ZOOM,
      });
    }
  }

  // TODO : add the type of the event
  async function handleMapClick(event: any) {
    const { lat, lng } = event.lngLat;
    props.onAdd && props.onAdd(event.lngLat, await fetchAddress(lat, lng));
  }

  async function fetchAddress(lat: number, lng: number) {
    return await Geocoder.fetchAddress(lat, lng);
  }

  function handlePolygonComplete(polygon: any) {
    console.log(polygon);
  }

  return (
    <Map
      ref={mapInstanceRef}
      mapboxAccessToken={Constants.MAPBOX.API_KEY}
      initialViewState={{
        longitude: viewport.lng,
        latitude: viewport.lat,
        zoom: props.zoom ?? Constants.MAPBOX.ZOOM,
      }}
      minZoom={Constants.MAPBOX.MIN_ZOOM}
      maxZoom={Constants.MAPBOX.MAX_ZOOM}
      mapStyle={mapStyle}
      onClick={handleMapClick}
      pitchWithRotate={false}
      dragRotate={false}
    >
      {drawing && (
        <Vendor.Drawing
          ref={mapInstanceRef}
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onPolygonComplete={handlePolygonComplete}
        />
      )}
      {props.markers &&
        props.markers
          .filter(
            (item: IMarker) =>
              filters.length === 0 ||
              (item.status && filters.includes(item.status))
          )
          .map((item: IMarker) => {
            return (
              <Vendor.Marker
                key={item.id}
                size="small"
                marker={item}
                onClick={props.onClick}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
                onListChange={props.onListChange}
                onListCreate={props.onListCreate}
              />
            );
          })}
      {layers && <Vendor.Layer onClick={setViewMode} />}
    </Map>
  );
};
