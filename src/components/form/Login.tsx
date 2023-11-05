import { Custom } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { useNavigate } from "react-router-dom";
import { Enums, Routes } from "utils";
import { Validations } from "helpers";
import { Box, Stack } from "@mui/material";
import { IUser } from "interfaces";

export type LoginForm = {
  email: string;
  password: string;
};

export const LoginInitialState: LoginForm = {
  email: "",
  password: "",
};

export const Login = () => {
  const { theme } = useTheme();
  const { auth } = useService();
  const { t, setFeedback, setUser } = useApp();
  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm<LoginForm>(
    LoginInitialState,
    undefined,
    submitCallback
  );

  async function submitCallback() {
    const { email, password }: LoginForm = values;

    // verify if the email and password has been provided
    if (!Validations.hasValue(email, password)) {
      return setFeedback({
        message: t.message.feedback.required_fields,
        severity: Enums.EnumFeedback.Info,
      });
    }

    // verify if the provided email is valid
    if (!Validations.isEmail(email)) {
      return setFeedback({
        message: t.message.auth.email_not_valid,
        severity: Enums.EnumFeedback.Info,
      });
    }

    const { status, payload } = await auth.login(email, password);

    if (status === Enums.EnumResponse.Success) {
      setUser(payload as IUser);
      navigate(Routes.map.home);
    } else {
      setFeedback({
        message: t.message.auth.wrong_credentials,
        severity: Enums.EnumFeedback.Error,
      });
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit} className="al-form">
      <Stack spacing={theme.spacing.md} alignItems="center">
        <Custom.TextField
          name="email"
          type="email"
          required={true}
          onChange={onChange}
          label={t.label.email}
        />
        <Custom.TextField
          name="password"
          type="password"
          required={true}
          onChange={onChange}
          label={t.label.password}
        />
        <Box className="al-control">
          <Custom.Button submit>{t.action.submit}</Custom.Button>
        </Box>
      </Stack>
    </Box>
  );
};
