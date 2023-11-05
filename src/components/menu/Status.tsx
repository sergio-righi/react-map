import { CheckRounded } from "@mui/icons-material";
import {
  ListItemIcon,
  ListItemText,
  Menu as MUIMenu,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { useApp, useMap } from "contexts";
import { IActivityStatus } from "interfaces";

type Props = {
  status: string | null;
  onClose: () => void;
  onChange: (id: string) => void;
  anchorEl: HTMLElement | null;
};

export const Status = ({ anchorEl = null, onClose, ...props }: Props) => {
  const { t } = useApp();
  const { statuses } = useMap();

  function handleStatusChange(id: string) {
    onClose();
    props.onChange(id);
  }

  return (
    <MUIMenu
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        sx: { minWidth: 200 },
      }}
    >
      {statuses.length === 0 && (
        <MenuItem disabled>
          <ListItemText inset>{t.message.placeholder.no_item}</ListItemText>
        </MenuItem>
      )}
      {statuses.map((item: IActivityStatus) => {
        return (
          <MenuItem
            key={item.id}
            disabled={item.id === props.status}
            onClick={() => handleStatusChange(item.id)}
          >
            {item.id === props.status && (
              <ListItemIcon>
                <CheckRounded />
              </ListItemIcon>
            )}
            <ListItemText inset={item.id !== props.status}>
              {item.name}
            </ListItemText>
          </MenuItem>
        );
      })}
    </MUIMenu>
  );
};
