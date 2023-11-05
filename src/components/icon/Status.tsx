import React, { forwardRef } from "react";
import { useTheme } from "contexts";
import { Box, SxProps } from "@mui/material";
import { Auxiliars } from "helpers";

// icons
import {
  RestaurantRounded,
  MuseumRounded,
  LocalActivityRounded,
  TrainRounded,
  HotelRounded,
  PlaceRounded,
  ArchitectureRounded,
  ShoppingCartRounded,
  NightlifeRounded,
  ConfirmationNumberRounded,
  ParkRounded,
} from "@mui/icons-material";

type Props = {
  sx?: SxProps;
  isCircle?: boolean;
  noStyle?: boolean;
  draggable?: boolean;
  status?: string;
  color?: string;
  size?: "small" | "medium" | "large";
};

export const Status = forwardRef(
  (
    {
      isCircle = true,
      noStyle = false,
      draggable = false,
      status,
      size = "small",
      ...props
    }: Props,
    elementRef: React.Ref<HTMLDivElement>
  ) => {
    const { theme } = useTheme();

    const iconSize = draggable
      ? 64
      : size === "medium"
      ? 24
      : size === "large"
      ? 48
      : 18;

    const iconColor = draggable
      ? theme.color.status.error.color
      : noStyle
      ? "currentColor"
      : Auxiliars.getContrast(props.color ?? theme.color.accent.color);

    const circleIcon =
      status === "food" ? (
        <RestaurantRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "cultural" ? (
        <MuseumRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "entertainment" ? (
        <LocalActivityRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "transport" ? (
        <TrainRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "accomodation" ? (
        <HotelRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "landmark" ? (
        <PlaceRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "architecture" ? (
        <ArchitectureRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "shopping" ? (
        <ShoppingCartRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "nightlife" ? (
        <NightlifeRounded sx={{ color: iconColor, height: iconSize }} />
      ) : status === "event" ? (
        <ConfirmationNumberRounded
          sx={{ color: iconColor, height: iconSize }}
        />
      ) : status === "nature" ? (
        <ParkRounded sx={{ color: iconColor, height: iconSize }} />
      ) : (
        <PlaceRounded sx={{ color: iconColor, height: iconSize }} />
      );

    return noStyle ? (
      circleIcon
    ) : (
      <Box
        ref={elementRef}
        sx={
          isCircle
            ? {
                ...props.sx,
                width: iconSize * 1.5,
                height: iconSize * 1.5,
                bgcolor: props.color ?? theme.color.accent.color,
                borderRadius: theme.border.circle,
              }
            : {
                width: 0,
                height: 0,
                borderRadius: 1,
                borderRight: `${iconSize * 1.2}px solid transparent`,
                borderLeft: `${iconSize * 1.2}px solid transparent`,
                borderBottom: `${iconSize * 2.2}px solid ${
                  theme.color.accent.color
                }`,
                ...props.sx,
              }
        }
      >
        <Box
          sx={
            isCircle
              ? {
                  top: "50%",
                  left: "50%",
                  lineHeight: 1,
                  position: "absolute",
                  transform: "translate(-50%,-50%)",
                }
              : {
                  top: "70%",
                  left: "50%",
                  lineHeight: 1,
                  position: "absolute",
                  transform: "translate(-50%,-50%)",
                }
          }
        >
          {circleIcon}
        </Box>
      </Box>
    );
  }
);
