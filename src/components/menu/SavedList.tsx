import { Menu as MUIMenu, MenuItem } from "@mui/material";
import { useApp } from "contexts";

type Props = {
  hidden?: boolean;
  archieved?: boolean;
  onClose: () => void;
  onGo?: () => void;
  onEdit?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onArchieve?: () => void;
  onVisibility?: () => void;
  anchorEl: HTMLElement | null;
};

export const SavedList = ({
  archieved = false,
  hidden = false,
  anchorEl = null,
  onClose,
  ...props
}: Props) => {
  const { t } = useApp();

  function handleArchieveChange() {
    onClose();
    props.onArchieve && props.onArchieve();
  }

  function handleVisibilityChange() {
    onClose();
    props.onVisibility && props.onVisibility();
  }

  function handleGoClick() {
    onClose();
    props.onGo && props.onGo();
  }

  function handleRenameClick() {
    onClose();
    props.onRename && props.onRename();
  }

  function handleEditClick() {
    onClose();
    props.onEdit && props.onEdit();
  }

  function handleDeleteClick() {
    onClose();
    props.onDelete && props.onDelete();
  }

  return (
    <MUIMenu
      open={!!anchorEl}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {props.onArchieve && (
        <MenuItem onClick={handleArchieveChange}>
          {archieved
            ? t.menu.saved_list.archieve.on
            : t.menu.saved_list.archieve.off}
        </MenuItem>
      )}
      {props.onVisibility && (
        <MenuItem onClick={handleVisibilityChange}>
          {hidden
            ? t.menu.saved_list.visibility.on
            : t.menu.saved_list.visibility.off}
        </MenuItem>
      )}
      {props.onGo && (
        <MenuItem onClick={handleGoClick}>{t.menu.saved_list.goto}</MenuItem>
      )}
      {props.onRename && (
        <MenuItem onClick={handleRenameClick}>
          {t.menu.saved_list.rename}
        </MenuItem>
      )}
      {props.onEdit && (
        <MenuItem onClick={handleEditClick}>{t.menu.saved_list.edit}</MenuItem>
      )}
      {props.onDelete && (
        <MenuItem onClick={handleDeleteClick}>
          {t.menu.saved_list.delete}
        </MenuItem>
      )}
    </MUIMenu>
  );
};
