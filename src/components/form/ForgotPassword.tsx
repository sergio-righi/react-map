import { Custom } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { useNavigate } from "react-router-dom";
import { Enums, Routes } from "utils";
import { Box, Stack } from "@mui/material";

export type ForgotPasswordForm = {
  email: string;
};

export const ForgotPasswordInitialState: ForgotPasswordForm = {
  email: "",
};

export const ForgotPassword = (props: any) => {
  const { theme } = useTheme();
  const { auth } = useService();
  const { t, setFeedback } = useApp();
  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm<ForgotPasswordForm>(
    ForgotPasswordInitialState,
    undefined,
    submitCallback
  );

  async function submitCallback() {
    const { email }: ForgotPasswordForm = values;

    const { status, payload } = await auth.forgotPassword(email);

    if (status === Enums.EnumResponse.Success) {
      setFeedback({
        message: t.message.auth.email_sent,
        severity: Enums.EnumFeedback.Info,
      });
      navigate(Routes.auth.home);
    } else {
      setFeedback({
        message: t.message.auth.email_not_found,
        severity: Enums.EnumFeedback.Error,
      });
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit} className="al-form">
      <Stack spacing={theme.spacing.md} alignItems="center">
        <Custom.TextField
          name="email"
          required={true}
          onChange={onChange}
          label={t.label.email}
        />
        <Box className="al-control">
          <Custom.Button submit>{t.action.submit}</Custom.Button>
        </Box>
      </Stack>
    </Box>
  );
};
