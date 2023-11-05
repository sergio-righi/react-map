import React, { forwardRef } from "react";
import { useTheme } from "contexts";
import { Box, SxProps } from "@mui/material";
import { Auxiliars } from "helpers";

// icons
import {
  ChatBubble,
  Check,
  DoubleCheck,
  OpenBook,
  Phone,
  Pin,
  Presentation,
  SadFace,
  UserCheck,
  UserClock,
  UserPencil,
} from "assets/icons";

type Props = {
  sx?: SxProps;
  isCircle?: boolean;
  noStyle?: boolean;
  draggable?: boolean;
  status?: string;
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
      ? 36
      : size === "medium"
      ? 20
      : size === "large"
      ? 28
      : 16;

    const iconColor = draggable
      ? theme.color.status.error.color
      : noStyle
      ? "currentColor"
      : Auxiliars.getContrast(theme.color.accent.color);

    const circleIcon =
      status === "1" ? (
        <SadFace fill={iconColor} height={iconSize} />
      ) : status === "2" ? (
        <OpenBook fill={iconColor} height={iconSize} />
      ) : status === "3" ? (
        <Phone fill={iconColor} height={iconSize} />
      ) : status === "4" ? (
        <ChatBubble fill={iconColor} height={iconSize} />
      ) : status === "5" ? (
        <Presentation fill={iconColor} height={iconSize} />
      ) : status === "6" ? (
        <UserPencil fill={iconColor} height={iconSize} />
      ) : status === "7" ? (
        <Check fill={iconColor} height={iconSize} />
      ) : status === "8" ? (
        <UserCheck fill={iconColor} height={iconSize} />
      ) : status === "9" ? (
        <UserClock fill={iconColor} height={iconSize} />
      ) : status === "10" ? (
        <DoubleCheck fill={iconColor} height={iconSize} />
      ) : (
        <Pin fill={iconColor} height={iconSize} />
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
                bgcolor: theme.color.accent.color,
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
