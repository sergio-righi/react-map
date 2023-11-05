import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Custom, DataGrid } from "components";
import { useApp, useMap, useService, useTheme } from "contexts";
import { IMarker, ISavedList } from "interfaces";

type Props = {
  open: boolean;
  onOpen?: () => void;
  savedList: ISavedList | null;
  onDelete?: (id: string, savedListId: string | null) => void;
  onClose?: () => void;
};

export const Marker = (props: Props) => {
  const { t } = useApp();
  const { lead } = useService();
  const { markers, setMarkers } = useMap();

  // TODO : it may be removed when getting the data from the API
  // instead of using array of string, it may be better to use an array of markers
  // for the saved list "markers" property
  const savedListMarkers: IMarker[] | null = props.savedList
    ? markers().filter(
        (item: IMarker) => item.savedListId === props.savedList?.id
      )
    : null;

  function handleRemove(rows: string[]) {
    rows.forEach((item: string) => {
      setMarkers(item, props.savedList?.id, false);
    });
  }

  function handleClose() {
    props.onClose && props.onClose();
  }

  return (
    <Custom.Modal
      open={props.open}
      onOpen={props.onOpen}
      onClose={handleClose}
      title={props.savedList?.name ?? ""}
      sx={{
        width: 1,
        maxWidth: 800,
      }}
    >
      <DataGrid.Marker data={savedListMarkers} onRemove={handleRemove} />
    </Custom.Modal>
  );
};
