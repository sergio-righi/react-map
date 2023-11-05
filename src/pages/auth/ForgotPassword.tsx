import React from "react";
import { Link } from "react-router-dom";
import { useApp, useTheme } from "contexts";
import { Common, Custom, Form } from "components";
import { Routes } from "utils";
import { Box, Stack } from "@mui/material";
import { Logo } from "assets/images";

export const ForgotPassword = () => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <Box className="al-page">
      <Stack className="al-wrapper" spacing={theme.spacing.md}>
        <Box className="al-brand">
          <Common.Image src={Logo} alt="Brand" />
        </Box>
        <Box className="al-header" color={theme.palette.font.color}>
          <Box className="title">{t.page.auth.forgot_password.title}</Box>
        </Box>
        <Box className="al-content">
          <Form.ForgotPassword />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          className="al-footer"
          justifyContent="center"
          spacing={theme.spacing.xs}
        >
          <Custom.Typography>
            {t.page.auth.forgot_password.remember_it}
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
