import React, { useState } from "react";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { useApp } from "contexts";
import { Menu } from "components";
import { Combines } from "helpers";

// icons
import { MoreVertRounded } from "@mui/icons-material";

type Props = {
  id: string;
  text: string;
  count: number;
  hidden?: boolean;
  onEdit?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGo?: (value: string) => void;
  onVisibility?: (id: string, hidden: boolean) => void;
};

export const SavedList = ({ hidden = false, ...props }: Props) => {
  const { t } = useApp();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClose = () => setAnchorEl(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  function handleGoClick() {
    props.onGo && props.onGo(props.id);
    handleClose();
  }

  function handleEditClick() {
    props.onEdit && props.onEdit(props.id);
    handleClose();
  }

  function handleRenameClick() {
    props.onRename && props.onRename(props.id);
    handleClose();
  }

  function handleDeleteClick() {
    props.onDelete && props.onDelete(props.id);
    handleClose();
  }

  function handleVisibilityChange() {
    props.onVisibility && props.onVisibility(props.id, hidden ? false : true);
    handleClose();
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={handleMenuClick}>
          <MoreVertRounded />
        </IconButton>
      }
    >
      <ListItemText
        primary={props.text}
        secondary={Combines.interpolate(t.message.saved_list.item_subtitle, {
          count: props.count,
        })}
      />
      <Menu.SavedList
        hidden={hidden}
        anchorEl={anchorEl}
        onClose={handleClose}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onRename={handleRenameClick}
        onVisibility={handleVisibilityChange}
        onGo={props.count > 0 ? handleGoClick : undefined}
      />
    </ListItem>
  );
};
