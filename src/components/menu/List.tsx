import {
  ListItemIcon,
  ListItemText,
  Menu as MUIMenu,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { useApp, useMap } from "contexts";
import { ISavedList } from "interfaces";
import { Custom } from "components";

// icons
import { AddRounded, CheckRounded } from "@mui/icons-material";

type Props = {
  savedListId: string | null;
  onClose: () => void;
  onChange: (id: string) => void;
  onCreate?: () => void;
  anchorEl: HTMLElement | null;
};

export const List = ({ anchorEl = null, onClose, ...props }: Props) => {
  const { t } = useApp();
  const { savedLists } = useMap();

  function handleCreateClick() {
    onClose();
    props.onCreate && props.onCreate();
  }

  function handleChangeClick(id: string) {
    onClose();
    props.onChange(id);
  }

  return (
    <MUIMenu
      open={!!anchorEl}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        sx: { minWidth: 200 },
      }}
    >
      {props.onCreate && (
        <MenuItem onClick={handleCreateClick}>
          <ListItemIcon>
            <AddRounded />
          </ListItemIcon>
          <ListItemText>{t.menu.list.create}</ListItemText>
        </MenuItem>
      )}
      {!props.onCreate && savedLists.length === 0 && (
        <MenuItem disabled>{t.message.placeholder.no_item}</MenuItem>
      )}
      {savedLists.length > 0 && <Custom.Divider />}
      {savedLists.map((item: ISavedList) => {
        return (
          <MenuItem
            key={item.id}
            disabled={item.id === props.savedListId}
            onClick={() => handleChangeClick(item.id)}
          >
            {item.id === props.savedListId && (
              <ListItemIcon>
                <CheckRounded />
              </ListItemIcon>
            )}
            <ListItemText inset={item.id !== props.savedListId}>
              {item.name}
            </ListItemText>
          </MenuItem>
        );
      })}
    </MUIMenu>
  );
};
