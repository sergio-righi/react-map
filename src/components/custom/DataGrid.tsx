import { useTheme } from "contexts";
import { DataGrid as MUIDataGrid } from "@mui/x-data-grid";
import { Constants } from "utils";

type Props = {
  columns: any;
  rows: Array<any>;
  isLoading: boolean;
  getRowId: (row: any) => any;
  onSelect?: (value: any) => void;
};

export const DataGrid = (props: Props) => {
  const { theme } = useTheme();
  return (
    <MUIDataGrid
      sx={{
        borderColor: "transparent",
        color: theme.palette.font.color,
        "& .MuiToolbar-root": {
          color: theme.palette.font.color,
        },
        "& .MuiSvgIcon-root": {
          color: theme.palette.font.color,
        },
      }}
      pageSize={Constants.PAGE_SIZE.DATA_GRID}
      autoHeight={false}
      checkboxSelection={!!props.onSelect}
      rows={props.rows}
      disableColumnMenu
      rowsPerPageOptions={[Constants.PAGE_SIZE.DATA_GRID]}
      key={props.getRowId}
      columns={props.columns}
      disableColumnSelector
      getRowId={props.getRowId}
      isLoading={props.isLoading}
      disableRowSelectionOnClick
      onRowSelectionModelChange={props.onSelect}
    />
  );
};
