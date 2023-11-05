import { useApp, useTheme } from "contexts";
import { Box, Stack } from "@mui/material";
import { Common, Custom, Form } from "components";
import { Logo } from "assets/images";

export const AccountConfirmation = () => {
  const { t, user } = useApp();
  const { theme } = useTheme();

  return (
    <Box className="al-page">
      <Stack className="al-wrapper" spacing={theme.spacing.md}>
        <Box className="al-brand">
          <Common.Image src={Logo} alt="Brand" />
        </Box>
        <Box className="al-header" color={theme.palette.font.color}>
          <Custom.Typography className="title">
            {t.page.auth.account_confirmation.title}
          </Custom.Typography>
          <Custom.Typography className="description">
            {t.message.auth.account_confirmation}
          </Custom.Typography>
          <Custom.Typography className="value">{user.email}</Custom.Typography>
        </Box>
        <Box className="al-content">
          <Form.AccountConfirmation />
        </Box>
      </Stack>
    </Box>
  );
};
