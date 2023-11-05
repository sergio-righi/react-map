import React from "react";
import { Link } from "react-router-dom";
import { useApp, useTheme } from "contexts";
import { Common, Custom, Form } from "components";
import { Box, Stack } from "@mui/material";
import { Routes } from "utils";
import { Logo } from "assets/images";

export const Login = () => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <Box className="al-page">
      <Stack className="al-wrapper" spacing={theme.spacing.md}>
        <Box className="al-brand">
          <Common.Image src={Logo} alt="Brand" />
        </Box>
        <Box className="al-header" color={theme.palette.font.color}>
          <Box className="title">{t.page.auth.login.title}</Box>
        </Box>
        <Box className="al-content">
          <Form.Login />
        </Box>
        <Stack
          alignItems="center"
          className="al-footer"
          justifyContent="center"
          spacing={theme.spacing.md}
        >
          <Link
            to={Routes.auth.forgotPassword}
            style={{ color: theme.palette.font.color }}
          >
            {t.page.auth.forgot_password.title}
          </Link>
          <Stack direction="row" spacing={theme.spacing.xs}>
            <Custom.Typography>
              {t.page.auth.login.has_no_account}
            </Custom.Typography>
            <Link
              to={Routes.auth.register}
              style={{ color: theme.palette.font.color }}
            >
              {t.page.auth.register.title}
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
