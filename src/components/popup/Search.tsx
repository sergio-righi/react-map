import React, { useState } from "react";
import { useApp, useTheme } from "contexts";
import { Popup, Vendor } from "components";
import { Enums } from "utils";
import { GeocodeFeature } from "@mapbox/mapbox-sdk/services/geocoding";
import { Coordinate } from "types";
import { Box, Stack } from "@mui/material";

type Props = {
  open: boolean;
  type: Enums.EnumMapboxType;
  onClose: () => void;
  onClick: (coordinate: Coordinate) => void;
};

export const Search = ({
  open = false,
  type = Enums.EnumMapboxType.All,
  ...props
}: Props) => {
  const textField = React.createRef<any>();

  const { t } = useApp();
  const { theme } = useTheme();
  const [searchResult, setSearchResult] = useState<GeocodeFeature[]>([]);

  function handleClick(coordinate: Coordinate) {
    props.onClick && props.onClick(coordinate);
  }

  // TODO : think about a better solution
  function handleOpen() {
    if (textField.current) {
      const input = textField.current.querySelector("input");
      if (input) {
        input.focus();
        input.value = "";
      }
    }
    setSearchResult([]);
  }

  return (
    <Popup.Root
      open={open}
      title={t.title.search}
      onClose={props.onClose}
      sx={{ top: theme.spacing.default, left: theme.spacing.default * 3.5 }}
    >
      <Stack>
        <Box p={theme.spacing.md}>
          <Vendor.Search type={type} onSearch={setSearchResult} />
        </Box>
        <Vendor.SearchResult items={searchResult} onClick={handleClick} />
      </Stack>
    </Popup.Root>
  );
};
