import React, { useState } from "react";
import { useApp, useTheme } from "contexts";
import { Popup, Vendor } from "components";
import { Enums } from "utils";
import { GeocodeFeature } from "@mapbox/mapbox-sdk/services/geocoding";
import { Coordinate } from "types";
import { Box, Stack } from "@mui/material";

type Props = {
  type: Enums.EnumMapboxType;
  onClose: () => void;
  onClick: (coordinate: Coordinate) => void;
};

export const Search = ({
  type = Enums.EnumMapboxType.All,
  ...props
}: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();
  const [searchResult, setSearchResult] = useState<GeocodeFeature[]>([]);

  function handleClick(coordinate: Coordinate) {
    props.onClick && props.onClick(coordinate);
  }

  return (
    <Stack>
      <Box p={theme.spacing.md}>
        <Vendor.Search type={type} onSearch={setSearchResult} />
      </Box>
      <Vendor.SearchResult items={searchResult} onClick={handleClick} />
    </Stack>
  );
};
