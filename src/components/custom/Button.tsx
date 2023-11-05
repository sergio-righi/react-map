import React from "react";
import { Button as MUIButton, ButtonProps, SxProps } from "@mui/material";
import { useTheme } from "contexts";
import { Auxiliars } from "helpers";

type Props = ButtonProps & {
  sx?: any;
  text?: boolean;
  submit?: boolean;
  tabIndex?: number;
  secondary?: boolean;
  children: React.ReactNode | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({
  text = false,
  submit = false,
  secondary = false,
  ...props
}: Props) => {
  const { theme } = useTheme();
  const accentColor = props.sx?.backgroundColor ?? theme.color.accent.color;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    props.onClick && props.onClick(event);
  }

  return (
    <MUIButton
      {...props}
      disableElevation
      tabIndex={props.tabIndex}
      variant={secondary ? "outlined" : text ? "text" : "contained"}
      sx={{
        borderRadius: theme.border.radius,
        borderColor: secondary ? accentColor : null,
        backgroundColor: secondary || text ? "transparent" : accentColor,
        color:
          secondary || text ? accentColor : Auxiliars.getContrast(accentColor),
        "&:hover": {
          opacity: 0.8,
          color:
            secondary || text
              ? accentColor
              : Auxiliars.getContrast(accentColor),
          backgroundColor: secondary || text ? "transparent" : accentColor,
          borderColor: accentColor,
        },
        ...props.sx,
      }}
      onClick={handleClick}
      type={submit ? "submit" : "button"}
    >
      {props.children}
    </MUIButton>
  );
};
