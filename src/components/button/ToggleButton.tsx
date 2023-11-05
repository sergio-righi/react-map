import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useTheme } from "contexts";

type Props = {
  tooltip?: string;
  active?: boolean;
  noStyle?: boolean;
  children: React.ReactNode;
  onClick?: (state: boolean) => void;
};

export const ToggleButton = ({
  active = false,
  noStyle = false,
  ...props
}: Props) => {
  const { theme } = useTheme();

  const stylesheet =
    active && !noStyle
      ? {
          color: theme.color.accent.text,
          backgroundColor: theme.color.accent.color,
        }
      : {
          color: theme.palette.font.color,
          backgroundColor: theme.palette.theme,
        };

  function handleClick() {
    props.onClick && props.onClick(!active);
  }

  return (
    <Tooltip title={props.tooltip} placement="right">
      <IconButton
        disableRipple
        onClick={handleClick}
        sx={{
          ...stylesheet,
          borderRadius: theme.border.radius,
          boxShadow: theme.palette.shadow,
          width: theme.component.button.toggleButton.width,
          height: theme.component.button.toggleButton.height,
        }}
      >
        {props.children}
      </IconButton>
    </Tooltip>
  );
};
