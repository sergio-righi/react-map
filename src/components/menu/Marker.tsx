import { useState } from "react";
import { ListItemText, Menu as MUIMenu, MenuItem } from "@mui/material";
import { Menu } from "components";
import { useApp } from "contexts";
import { IMarker } from "interfaces";

// icons
import { ArrowRightRounded } from "@mui/icons-material";

type Props = {
  marker: IMarker;
  onDelete?: () => void;
  onClose: () => void;
  onStatusChange?: (id: string) => void;
  onListChange?: (id: string) => void;
  onListCreate?: () => void;
  anchorEl: HTMLElement | null;
};

export const Marker = ({ anchorEl = null, onClose, ...props }: Props) => {
  const { t } = useApp();
  const [listAnchorEl, setListAnchorEl] = useState<HTMLElement | null>(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState<HTMLElement | null>(
    null
  );

  function handleStatusMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setStatusAnchorEl(event.currentTarget);
  }

  function handleStatusMenuClose() {
    setStatusAnchorEl(null);
  }

  function handleListMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setListAnchorEl(event.currentTarget);
  }

  function handleListMenuClose() {
    setListAnchorEl(null);
  }

  function handleDeleteClick() {
    onClose();
    props.onDelete && props.onDelete();
  }

  function handleStatusChangeClick(id: string) {
    onClose();
    props.onStatusChange && props.onStatusChange(id);
  }

  function handleListChangeClick(id: string) {
    onClose();
    props.onListChange && props.onListChange(id);
  }

  function handleListCreateClick() {
    onClose();
    props.onListCreate && props.onListCreate();
  }

  return (
    <MUIMenu onClose={onClose} anchorEl={anchorEl} open={!!anchorEl}>
      {props.onStatusChange && (
        <MenuItem onClick={handleStatusMenuOpen}>
          <ListItemText>{t.menu.marker.activity_status}</ListItemText>
          <ArrowRightRounded />
        </MenuItem>
      )}
      {props.onStatusChange && (
        <Menu.Status
          status={props.marker.status}
          anchorEl={statusAnchorEl}
          onClose={handleStatusMenuClose}
          onChange={handleStatusChangeClick}
        />
      )}
      {props.onListCreate && props.onListChange && (
        <MenuItem onClick={handleListMenuOpen}>
          <ListItemText>{t.menu.marker.saved_list}</ListItemText>
          <ArrowRightRounded />
        </MenuItem>
      )}
      {props.onListChange && (
        <Menu.List
          savedListId={props.marker.savedListId}
          anchorEl={listAnchorEl}
          onClose={handleListMenuClose}
          onChange={handleListChangeClick}
          onCreate={handleListCreateClick}
        />
      )}
      {props.onDelete && (
        <MenuItem onClick={handleDeleteClick}>{t.menu.marker.delete}</MenuItem>
      )}
    </MUIMenu>
  );
};
