import { useEffect, useState } from "react";
import { useApp, useMap, useService, useTheme } from "contexts";
import { Controller, Custom, Icon, Popup, Vendor, Modal } from "components";
import { Box } from "@mui/material";
import { IActivityStatus, IMarker, ISavedList } from "interfaces";
import { Coordinate } from "types";

type Props = {
  zoom?: number;
  markers: IMarker[];
  coordinate?: Coordinate;
  status?: string;
  statuses: IActivityStatus[];
  onSelect?: (status: string) => void;
};

export const View = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { lead } = useService();
  const {
    savedList,
    setMarkers,
    setMarkerSavedList,
    setSavedList,
    setSavedLists,
    status,
  } = useMap();

  const [filterPopup, setFilterPopup] = useState<boolean>(false);

  const [savedListModal, setSavedListModal] = useState<boolean>(false);

  const [markerId, setMarkerId] = useState<string | null>(null);
  const [marker, setMarker] = useState<IMarker | null>(null);

  const [filters, setFilters] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<Custom.ChipProps[]>([]);

  useEffect(() => {
    setStatuses(
      props.statuses.map((item: IActivityStatus) => {
        return {
          id: item.id,
          label: item.name,
          withShadow: true,
          avatar: <Icon.Status noStyle status={item.id} />,
        } as Custom.ChipProps;
      })
    );
  }, [props.statuses]);

  // handle the status change for the marking feature
  function handleStatusClick(value: string[]) {
    const newValue = value.length > 0 ? value[0] : "";
    props.onSelect && props.onSelect(newValue);
  }

  // handle the click on the map to create a new marker
  async function handleMarkerAdd(coordinate: Coordinate, address: string) {
    const newMarker = {
      lat: coordinate.lat,
      lng: coordinate.lng,
      address,
      status: status,
      savedListId: null,
    } as IMarker;
    const { payload } = await lead.insertMarker(newMarker);
    setMarkers({ ...newMarker, id: payload });
  }

  // handle the click on the marker to open the details popup
  function handleMarkerClick(marker: IMarker) {
    setMarker(marker);
  }

  // handle the callback from the context menu (update status) option
  async function handleMarkerUpdate(marker: IMarker) {
    await lead.updateMarker(marker.id, marker);
    setMarkers(marker);
  }

  // handle the callback from the context menu (delete marker) option
  async function handleMarkerDelete(id: string, savedListId: string | null) {
    if (!id) return;
    await lead.deleteMarker(id);
    setMarkers(id, savedListId);
  }

  function handleFilterClick(state: boolean) {
    setFilterPopup(state);
  }

  function handleFilterClose() {
    setFilterPopup(false);
  }

  // handle the click on the context menu (saved list) option
  async function handleListChange(
    markerId: string,
    newSavedListId: string,
    oldSavedListId: string | null
  ) {
    setMarkerSavedList(markerId, newSavedListId, oldSavedListId);
  }

  // handle the event of submitting the saved list form
  function handleSavedListSubmit(data: ISavedList) {
    setSavedListModal(false);
    setSavedLists(data, markerId);
  }

  // handle the click on the context menu (create saved list) option
  function handleSavedListCreateClick(id: string) {
    setMarkerId(id);
    setSavedListModal(true);
  }

  function handleSavedListModalClose() {
    setMarkerId(null);
    setSavedListModal(false);
  }

  function handleMarkerPopupClose() {
    setSavedList(null);
  }

  return (
    <Box
      width={1}
      height="100vh"
      position="relative"
      pl={theme.component.navbar.width / theme.spacing.factor}
    >
      <Vendor.Mapbox
        layers={false}
        zoom={props.zoom}
        coordinate={props.coordinate}
        markers={props.markers}
        filters={filters}
        status={props.status}
        onAdd={handleMarkerAdd}
        onClick={handleMarkerClick}
        onDelete={handleMarkerDelete}
        onUpdate={handleMarkerUpdate}
        onListChange={handleListChange}
        onListCreate={handleSavedListCreateClick}
      />
      <Modal.SavedList
        savedList={null}
        open={savedListModal}
        onClose={handleSavedListModalClose}
        onSubmit={handleSavedListSubmit}
      />
      <Modal.Marker
        open={!!savedList}
        savedList={savedList}
        onClose={handleMarkerPopupClose}
      />
      <Popup.Filter
        open={filterPopup}
        statuses={props.statuses}
        onFilter={setFilters}
        onClose={handleFilterClose}
      />
      <Custom.Fab
        bottom
        right
        closable
        icon="filter"
        state={filterPopup}
        onStateChange={handleFilterClick}
      />
      <Controller.Chip
        sx={{
          zIndex: 5,
          position: "absolute",
          gap: theme.spacing.sm,
          top: theme.spacing.default,
          right: theme.spacing.default,
        }}
        items={statuses}
        onSelect={handleStatusClick}
      />
    </Box>
  );
};
