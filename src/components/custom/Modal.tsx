import "assets/scss/components/modal.scss";

import React, { useEffect } from "react";
import { Box, Modal as MUIModal, SxProps, Stack } from "@mui/material";
import { useTheme } from "contexts";
import { Custom } from "components";
import { Validations } from "helpers";

// icons
import { CloseRounded } from "@mui/icons-material";

type Props = {
  sx?: SxProps;
  title: string;
  open: boolean;
  message?: string;
  children: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
};

export const Modal = ({
  open = false,
  title,
  message,
  children,
  onOpen,
  onClose,
  ...props
}: Props) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (open) onOpen && onOpen();
  }, [open]);

  function handleClose(): void {
    onClose && onClose();
  }

  return (
    <MUIModal open={open} onClose={handleClose} className="al-modal">
      <Box className="al-container" sx={props.sx}>
        {Validations.hasValue(message) && (
          <Custom.Alert
            className="al-feedback"
            variant="filled"
            severity={"error"}
          >
            <Custom.Typography>{message}</Custom.Typography>
          </Custom.Alert>
        )}
        <Box
          className="al-wrapper"
          bgcolor={theme.palette.theme}
          color={theme.palette.font.color}
          borderRadius={theme.border.radius}
        >
          <Stack
            direction="row"
            className="al-header"
            alignItems="center"
            px={theme.spacing.lg}
            pt={theme.spacing.lg}
          >
            <Custom.Typography size={theme.font.lg} weight={theme.font.normal}>
              {title}
            </Custom.Typography>
            <Stack marginLeft="auto">
              {onClose && (
                <Custom.IconButton
                  onClick={handleClose}
                  iconColor={theme.palette.font.color}
                >
                  <CloseRounded />
                </Custom.IconButton>
              )}
            </Stack>
          </Stack>
          <Box className="al-content" p={theme.spacing.lg}>
            <Box className="al-wrapper">{children}</Box>
          </Box>
        </Box>
      </Box>
    </MUIModal>
  );
};
