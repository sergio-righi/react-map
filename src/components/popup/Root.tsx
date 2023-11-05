import React, { useEffect } from "react";
import { useTheme } from "contexts";
import { Box, IconButton, Grow, Stack, SxProps } from "@mui/material";
import { Custom } from "components";

// icons
import { CloseRounded } from "@mui/icons-material";
import { Constants } from "utils";

type Props = {
  sx?: SxProps;
  title: string;
  open: boolean;
  overlay?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
};

export const Root = ({ overlay = true, open = false, ...props }: Props) => {
  const { theme } = useTheme();

  const sxRoot = open
    ? { zIndex: 1051, opacity: 1, visibility: "visible" }
    : { zIndex: -1, opacity: 0, visibility: "hidden" };

  useEffect(() => {
    if (open) {
      props.onOpen && props.onOpen();

      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [open]);

  function handleInnerClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  function handleClose() {
    props.onClose && props.onClose();
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === Constants.KEY_CODE.ESC) {
      handleClose();
    }
  }

  function renderContent() {
    const conditionalProps = overlay ? { zIndex: 1051 } : sxRoot;

    return (
      <Grow in={open}>
        <Stack
          sx={{
            width: 300,
            minHeight: 250,
            position: "fixed",
            overflow: "hidden",
            ...conditionalProps,
            boxShadow: theme.palette.shadow,
            color: theme.palette.font.color,
            borderRadius: theme.border.radius,
            backgroundColor: theme.palette.theme,
            ...(props.sx as any),
          }}
          onClick={handleInnerClick}
        >
          <Stack
            width={1}
            height={60}
            direction="row"
            alignItems="center"
            px={theme.spacing.md}
            justifyContent="space-between"
          >
            <Custom.Typography size={theme.font.md} weight={theme.font.medium}>
              {props.title}
            </Custom.Typography>
            <IconButton onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          </Stack>
          <Custom.Divider />
          <Stack width={1} height={1} overflow="auto">
            {props.children}
          </Stack>
        </Stack>
      </Grow>
    );
  }

  return overlay ? (
    <Stack
      sx={{
        top: 0,
        left: 0,
        right: 0,
        ...sxRoot,
        bottom: 0,
        position: "absolute",
        backgroundColor: theme.color.overlay,
      }}
      onClick={handleClose}
    >
      {renderContent()}
    </Stack>
  ) : (
    renderContent()
  );
};
