import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Custom } from "components";
import { SatelliteView, StreetView } from "assets/images";
import { Enums } from "utils";

type Props = {
  viewMode?: Enums.EnumMapboxLayer;
  onClick: (viewMode: Enums.EnumMapboxLayer) => void;
};

export const Layer = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<Enums.EnumMapboxLayer>(
    props.viewMode ?? Enums.EnumMapboxLayer.Street
  );
  const viewModeClick = () =>
    setViewMode(
      viewMode === Enums.EnumMapboxLayer.Street
        ? Enums.EnumMapboxLayer.Satellite
        : Enums.EnumMapboxLayer.Street
    );

  useEffect(() => props.onClick && props.onClick(viewMode), [viewMode]);

  const layerName =
    viewMode === Enums.EnumMapboxLayer.Street
      ? t.label.street
      : viewMode === Enums.EnumMapboxLayer.Satellite
      ? t.label.satellite
      : null;

  return (
    <Box
      sx={{
        zIndex: 1,
        width: 80,
        height: 50,
        cursor: "pointer",
        overflow: "hidden",
        position: "absolute",
        left: theme.spacing.default,
        bottom: theme.spacing.default,
        borderRadius: theme.border.radius,
        backgroundColor: theme.palette.theme,
      }}
      onClick={viewModeClick}
    >
      {viewMode === Enums.EnumMapboxLayer.Street ? (
        <Box
          width={1}
          alt={layerName}
          component="img"
          src={SatelliteView}
          borderRadius={theme.border.radius}
        />
      ) : viewMode === Enums.EnumMapboxLayer.Satellite ? (
        <Box
          width={1}
          alt={layerName}
          component="img"
          src={StreetView}
          borderRadius={theme.border.radius}
        />
      ) : null}
      <Stack
        alignItems="center"
        sx={{
          left: 0,
          right: 0,
          bottom: 5,
          position: "absolute",
        }}
      >
        <Custom.Typography
          sx={{
            color:
              viewMode === Enums.EnumMapboxLayer.Street
                ? theme.color.white
                : theme.palette.font.color,
          }}
        >
          {layerName}
        </Custom.Typography>
      </Stack>
    </Box>
  );
};

Layer.defaultProps = {
  viewMode: Enums.EnumMapboxLayer.Street,
};
