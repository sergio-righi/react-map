import React from "react";
import { Custom } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { useNavigate } from "react-router-dom";
import { Enums, Routes } from "utils";
import { Combines } from "helpers";
import { Auxiliars, Validations } from "helpers";
import { Box, Grid, Stack } from "@mui/material";
import { IUser } from "interfaces";

export type RegisterForm = {
  companyName: string;
  email: string;
  password: string;
};

export const RegisterInitialState: RegisterForm = {
  companyName: "",
  email: "",
  password: "",
};

export const Register = () => {
  const { theme } = useTheme();
  const { auth } = useService();
  const navigate = useNavigate();
  const { t, setFeedback, setUser } = useApp();

  const { onChange, onSubmit, values } = useForm<RegisterForm>(
    RegisterInitialState,
    undefined,
    submitCallback
  );

  async function submitCallback() {
    const { companyName, email, password }: RegisterForm = values;

    // verify if all the required information was provided
    if (!Validations.hasValue(companyName, email, password)) {
      return setFeedback({
        message: t.message.feedback.required_fields,
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

    // verify if the email provided is a GMAIL account
    if (!Validations.isGmail(email)) {
      return setFeedback({
        message: t.message.auth.email_provider,
        severity: Enums.EnumFeedback.Error,
      });
    }

    // const { password, ...rest }: any = values;
    // shareCalendar(calendarId, values.email);
    // setUser({ userId: payload, ...rest, active: false } as IUser);
    // TODO : it must be uncommented to redirect to the account confirmation page
    // navigate(
    //   Combines.joinURL(Routes.auth.home, Routes.auth.accountConfirmation)
    // );
    navigate(Routes.map.home);
  }

  async function createCalendar() {}

  async function shareCalendar(calendarId: string, email: string) {}

  async function deleteCalendar(calendarId: string) {}

  return (
    <Box component="form" onSubmit={onSubmit} className="al-form">
      <Stack spacing={theme.spacing.md} alignItems="center">
        <Grid container spacing={theme.spacing.md}>
          <Grid item xs={12}>
            <Custom.TextField
              required={true}
              name="companyName"
              onChange={onChange}
              label={t.label.company_name}
            />
          </Grid>
          <Grid item xs={12}>
            <Custom.TextField
              name="email"
              type="email"
              required={true}
              onChange={onChange}
              label={t.label.email}
              helperText={t.helper_text.email_gmail}
            />
          </Grid>
          <Grid item xs={12}>
            <Custom.TextField
              type="password"
              name="password"
              required={true}
              onChange={onChange}
              label={t.label.password}
            />
          </Grid>
        </Grid>
        <Stack direction="row" className="al-control">
          <Custom.Button submit>{t.action.submit}</Custom.Button>
        </Stack>
      </Stack>
    </Box>
  );
};
