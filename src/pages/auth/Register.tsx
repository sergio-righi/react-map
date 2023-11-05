import { Link } from "react-router-dom";
import { useApp, useTheme } from "contexts";
import { Box, Stack } from "@mui/material";
import { Common, Custom, Form } from "components";
import { Routes } from "utils";
import { Logo } from "assets/images";

export const Register = () => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <Box className="al-page">
      <Stack className="al-wrapper" spacing={theme.spacing.md}>
        <Box className="al-brand">
          <Common.Image src={Logo} alt="Brand" />
        </Box>
        <Box className="al-header">
          <Box className="title">{t.page.auth.register.title}</Box>
        </Box>
        <Box className="al-content">
          <Form.Register />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          className="al-footer"
          justifyContent="center"
          spacing={theme.spacing.xs}
        >
          <Custom.Typography>
            {t.page.auth.register.has_account}
          </Custom.Typography>
          <Link
            to={Routes.auth.home}
            style={{ color: theme.palette.font.color }}
          >
            {t.page.auth.login.title}
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};
