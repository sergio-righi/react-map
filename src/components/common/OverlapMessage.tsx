import { useEffect, useState } from "react";
import { Box, Paper, Stack, SxProps } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";
import { Constants } from "utils";

// icons
import { InfoRounded } from "@mui/icons-material";

type Props = {
  sx: SxProps;
  message: string;
  collapsable?: boolean;
};

export const OverlapMessage = ({ collapsable = true, ...props }: Props) => {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (collapsable) {
      const timeout = setTimeout(
        () => setCollapsed(!collapsed),
        Constants.REFRESH_RATE.OVERLAP_MESSAGE
      );
      return () => clearTimeout(timeout);
    }
  }, []);

  function handleClick() {
    setCollapsed(!collapsed);
  }

  return (
    <Box zIndex={5} position="absolute" sx={props.sx}>
      <Paper
        elevation={1}
        sx={{
          py: theme.spacing.xs,
          pl: theme.spacing.xs,
          pr: theme.spacing.xs,
          boxShadow: theme.palette.shadow,
          borderRadius: theme.border.radius,
          backgroundColor: theme.palette.theme,
          cursor: collapsable ? "pointer" : undefined,
        }}
        onClick={handleClick}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={!collapsed ? theme.spacing.xs : undefined}
        >
          <InfoRounded />
          {!collapsed && (
            <Custom.Typography as="span">{props.message}</Custom.Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
