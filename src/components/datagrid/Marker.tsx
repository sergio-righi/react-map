import { useState } from "react";
import { useApp, useMap } from "contexts";
import { Custom, Progress } from "components";
import { IActivityStatus, IMarker } from "interfaces";
import { Box } from "@mui/material";

type Props = {
  data: IMarker[] | null;
  onRemove: (rows: any[]) => void;
};

export const Marker = (props: Props) => {
  const { t } = useApp();
  const { setMarkerSavedList, statuses } = useMap();

  const [selected, setSelected] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  // TODO : it may be great to add a shortcut for the menu options from the marker here (edit, view, generate design...)
  const columns = [
    {
      field: "name",
      width: 200,
      sortable: true,
      headerName: t.label.name,
      renderCell: ({ row }: { row: IMarker }) => {
        return <Custom.Typography>{row.id ?? "—"}</Custom.Typography>;
      },
    },
    {
      field: "email",
      width: 200,
      sortable: false,
      headerName: t.label.email,
      renderCell: ({ row }: { row: IMarker }) => {
        return <Custom.Typography>{row.savedListId ?? "—"}</Custom.Typography>;
      },
    },
    {
      field: "status",
      width: 100,
      sortable: true,
      headerName: t.label.status,
      renderCell: ({ row }: { row: IMarker }) => {
        return (
          <Custom.Typography>
            {row.status
              ? statuses.find((item: IActivityStatus) => row.status === item.id)
                  ?.name
              : "—"}
          </Custom.Typography>
        );
      },
    },
    { field: "address", headerName: t.label.address, width: 450 },
  ];

  function handleRemove() {
    props.onRemove && props.onRemove(selected);
  }

  return (
    <Box position="relative">
      {props.data && props.data.length > 0 ? (
        <Custom.DataGrid
          columns={columns}
          rows={props.data}
          isLoading={isLoading}
          onSelect={setSelected}
          getRowId={(row: IMarker) => row.id}
        />
      ) : props.data && props.data.length === 0 ? (
        <Progress.NoRecord
          height={250}
          message={t.message.placeholder.no_record}
        />
      ) : (
        <Progress.PageProcess />
      )}
      <Custom.Button
        secondary
        onClick={handleRemove}
        disabled={selected.length === 0}
      >
        {t.action.remove}
      </Custom.Button>
    </Box>
  );
};
