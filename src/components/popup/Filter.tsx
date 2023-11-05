import { Controller, Custom, Icon, Popup } from "components";
import { useApp, useTheme } from "contexts";
import { IActivityStatus } from "interfaces";

type Props = {
  open: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onFilter: (filters: string[]) => void;
  statuses: IActivityStatus[];
};

export const Filter = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  function handleStatusClick(value: string[]) {
    props.onFilter && props.onFilter(value);
  }

  return (
    <Popup.Root
      title={t.title.filter_status}
      open={props.open}
      onOpen={props.onOpen}
      onClose={props.onClose}
      sx={{ bottom: theme.spacing.default * 3, right: theme.spacing.default }}
    >
      <Controller.Chip
        multiple
        sx={{
          zIndex: 1,
          flexWrap: "wrap",
          gap: theme.spacing.sm,
          padding: theme.spacing.md,
        }}
        sxItem={{
          backgroundColor: theme.palette.background.color,
        }}
        items={props.statuses.map((item: IActivityStatus) => {
          return {
            id: item.id,
            label: item.name,
            avatar: <Icon.Status noStyle status={item.id} />,
          } as Custom.ChipProps;
        })}
        onSelect={handleStatusClick}
      />
    </Popup.Root>
  );
};
