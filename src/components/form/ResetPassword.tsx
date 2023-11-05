import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import { Custom } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Enums, Routes } from "utils";
import { Validations } from "helpers";

export type ResetPasswordForm = {
  password: string;
  confirm_password: string;
};

export const ResetPasswordInitialState: ResetPasswordForm = {
  password: "",
  confirm_password: "",
};

export const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t, setFeedback } = useApp();
  const { auth } = useService();

  const { onChange, onSubmit, values } = useForm<ResetPasswordForm>(
    ResetPasswordInitialState,
    undefined,
    submitCallback
  );

  async function submitCallback() {
    const { password, confirm_password }: ResetPasswordForm = values;

    // verify if the passwords match
    if (password !== confirm_password) {
      return setFeedback({
        message: t.message.auth.password_mistmatch,
        severity: Enums.EnumFeedback.Info,
      });
    }

    // verify if the password policy was met
    if (!Validations.isPasswordValid(password)) {
      return setFeedback({
        message: t.message.auth.password_invalid,
        severity: Enums.EnumFeedback.Error,
      });
    }

    // verify if the user is known
    if (!Validations.hasValue(params.id)) {
      return setFeedback({
        message: t.message.feedback.request_error,
        severity: Enums.EnumFeedback.Error,
      });
    }

    const { status, payload } = await auth.resetPassword(
      params?.id ?? "",
      password
    );

    if (status === Enums.EnumResponse.Success) {
      setFeedback({
        message: t.message.auth.password_updated,
        severity: Enums.EnumFeedback.Success,
      });
      navigate(Routes.auth.home);
    } else {
      setFeedback({
        message: t.message.feedback.request_error,
        severity: Enums.EnumFeedback.Error,
      });
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit} className="al-form">
      <Stack spacing={theme.spacing.md} alignItems="center">
        <Grid container spacing={theme.spacing.md}>
          <Grid item xs={12} sm={6}>
            <Custom.TextField
              name="password"
              type="password"
              required={true}
              onChange={onChange}
              label={t.label.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Custom.TextField
              type="password"
              name="confirm_password"
              required={true}
              onChange={onChange}
              label={t.label.confirm_password}
            />
          </Grid>
        </Grid>
        <Custom.Button submit>{t.action.continue}</Custom.Button>
      </Stack>
    </Box>
  );
};
