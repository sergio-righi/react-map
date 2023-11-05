import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Icon, Menu, Modal } from "components";
import { Marker as MBMarker, MarkerDragEvent } from "react-map-gl";
import { Coordinate } from "types";
import { useApp, useMap } from "contexts";
import { IMarker } from "interfaces";

type Props = {
  marker: IMarker;
  editable?: boolean;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  onEdit?: (marker: IMarker) => void;
  onClick?: (marker: IMarker) => void;
  onUpdate?: (marker: IMarker) => void;
  onDelete?: (id: string, savedListId: string | null) => void;
  onListChange: (
    markerId: string,
    newSavedListId: string,
    oldSavedListId: string | null
  ) => void;
  onListCreate: (id: string) => void;
  onGenerateDesign?: (marker: IMarker, coordinate: Coordinate) => void;
};

export const Marker = ({ marker, editable = false, ...props }: Props) => {
  const elementRef = useRef<any>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isLongPressing, setLongPressing] = useState<boolean>(false);

  const [coordinate, setCoordinate] = useState<Coordinate>({
    lat: marker.lat,
    lng: marker.lng,
  });

  // Apply a scale transformation during long press
  const markerStyle = {
    cursor: "pointer",
    transform: isLongPressing ? "scale(1.5)" : "scale(1)", // Adjust the scale factor as needed
    transition: isLongPressing ? "transform 0.2s ease" : undefined, // Adjust the transition duration as needed
  };

  // Add touch event listeners to detect long press
  useEffect(() => {
    let touchTimer: NodeJS.Timeout;

    const handleTouchStart = () => {
      touchTimer = setTimeout(() => {
        setLongPressing(true);
      }, 300);
    };

    const handleTouchEnd = () => {
      clearTimeout(touchTimer);
      setLongPressing(false);
    };

    const markerElement = elementRef.current;

    if (!markerElement) return;

    markerElement.addEventListener("touchstart", handleTouchStart);
    markerElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      markerElement.removeEventListener("touchstart", handleTouchStart);
      markerElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  function onMarkerDrag(event: MarkerDragEvent) {
    setCoordinate({
      lng: event.lngLat.lng,
      lat: event.lngLat.lat,
    });
  }

  function handleContextMenu(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function handleContextMenuClose() {
    setAnchorEl(null);
  }

  function handleGenerateDesignClick() {
    props.onGenerateDesign &&
      props.onGenerateDesign(marker, {
        lat: marker.lat,
        lng: marker.lng,
      } as Coordinate);
    handleContextMenuClose();
  }

  function handleStatusChange(item: string): void {
    handleContextMenuClose();
    props.onUpdate && props.onUpdate({ ...marker, status: item } as IMarker);
  }

  function handleListChange(id: string): void {
    handleContextMenuClose();
    props.onUpdate && props.onUpdate({ ...marker, savedListId: id } as IMarker);
    props.onListChange && props.onListChange(marker.id, id, marker.savedListId);
  }

  function handleListCreateClick() {
    handleContextMenuClose();
    props.onListCreate && props.onListCreate(marker.id);
  }

  function handleEditClick() {
    props.onEdit && props.onEdit(marker);
    handleContextMenuClose();
  }

  // TODO : add the type of the event
  function handleMarkerClick(event: any) {
    event.originalEvent && event.originalEvent.stopPropagation();
    props.onClick && props.onClick(marker);
  }

  function handleDeleteClick() {
    props.onDelete && props.onDelete(marker.id, marker.savedListId);
    handleContextMenuClose();
  }

  function handleDragEnd(event: MarkerDragEvent) {
    const newValue = {
      ...marker,
      lat: event.lngLat.lat,
      lng: event.lngLat.lng,
    } as IMarker;
    props.onUpdate && props.onUpdate(newValue);
  }

  return (
    <MBMarker
      anchor="bottom"
      onDrag={onMarkerDrag}
      onDragEnd={handleDragEnd}
      latitude={coordinate.lat}
      longitude={coordinate.lng}
      onClick={handleMarkerClick}
      // draggable={!!props.onUpdate && editable}
    >
      {props.children ? (
        props.children
      ) : (
        <Box onContextMenu={handleContextMenu}>
          <Icon.Status
            ref={elementRef}
            sx={markerStyle}
            size={props.size}
            status={marker.status}
          />
          <Menu.Marker
            marker={marker}
            anchorEl={anchorEl}
            generated={marker.generated}
            onClose={handleContextMenuClose}
            onGenerate={handleGenerateDesignClick}
            onStatusChange={handleStatusChange}
            onListChange={handleListChange}
            onListCreate={handleListCreateClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </Box>
      )}
    </MBMarker>
  );
};
