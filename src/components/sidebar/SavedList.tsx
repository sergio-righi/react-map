import { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Custom, Item, Modal, Progress } from "components";
import { useApp, useMap, useService, useTheme } from "contexts";
import { IMarker, ISavedList } from "interfaces";
import { Coordinate } from "types";

// icons
import { AddRounded } from "@mui/icons-material";

type Props = {
  onClose: () => void;
  onGo: (coordinate: Coordinate) => void;
};

export const SavedList = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { lead } = useService();
  const { markers, savedLists, setSavedList, setSavedLists } = useMap();

  const [savedListModal, setSavedListModal] = useState<boolean>(false);
  const [selectedSavedList, setSelectedSavedList] = useState<ISavedList | null>(
    null
  );

  function findSavedList(id: string): ISavedList | null {
    return savedLists.find((item: ISavedList) => item.id === id) ?? null;
  }

  function handleSavedListGoClick(id: string) {
    const currentSavedList = findSavedList(id);
    if (currentSavedList && currentSavedList.markers.length > 0) {
      const marker = markers().find(
        (item: IMarker) => item.id === currentSavedList.markers[0]
      );
      if (marker) {
        props.onGo &&
          props.onGo({
            lat: marker.lat,
            lng: marker.lng,
          });
      }
    }
  }

  function handleSavedListSubmit(data: ISavedList) {
    setSavedListModal(false);
    setSavedLists(data);
  }

  function handleSavedListCreateClick() {
    setSelectedSavedList(null);
    setSavedListModal(true);
  }

  async function handleSavedListVisibilityClick(id: string, hidden: boolean) {
    const currentSavedList = findSavedList(id);
    await lead.updateSavedList(id, { hidden } as ISavedList);
    setSavedLists({ ...currentSavedList, hidden } as ISavedList);
  }

  function handleSavedListRenameClick(id: string) {
    const currentSavedList = findSavedList(id);
    if (currentSavedList) {
      setSelectedSavedList(currentSavedList);
      setSavedListModal(true);
    }
    props.onClose && props.onClose();
  }

  function handleSavedListEditClick(id: string) {
    const currentSavedList = findSavedList(id);
    if (currentSavedList) {
      setSavedList(currentSavedList);
    }
    props.onClose && props.onClose();
  }

  async function handleSavedListDeleteClick(id: string) {
    await lead.deleteSavedList(id);
    setSavedLists(id);
  }

  function handleSavedListModalClose() {
    setSavedListModal(false);
  }

  return (
    <>
      <List dense>
        <ListItem>
          <ListItemText primary={t.title.list} />
          <Custom.Button
            text
            size="small"
            onClick={handleSavedListCreateClick}
            startIcon={<AddRounded />}
          >
            {t.action.create}
          </Custom.Button>
        </ListItem>
        {savedLists.length > 0 ? (
          savedLists.map((item: ISavedList) => {
            return (
              <Item.SavedList
                id={item.id}
                key={item.id}
                text={item.name}
                color={item.color}
                hidden={item.hidden}
                count={item.markers.length}
                onGo={handleSavedListGoClick}
                onEdit={handleSavedListEditClick}
                onRename={handleSavedListRenameClick}
                onDelete={handleSavedListDeleteClick}
                onVisibility={handleSavedListVisibilityClick}
              />
            );
          })
        ) : (
          <ListItem sx={{ position: "relative" }}>
            <Progress.NoRecord height={150} />
          </ListItem>
        )}
      </List>
      <Modal.SavedList
        open={savedListModal}
        savedList={selectedSavedList}
        onClose={handleSavedListModalClose}
        onSubmit={handleSavedListSubmit}
      />
    </>
  );
};
