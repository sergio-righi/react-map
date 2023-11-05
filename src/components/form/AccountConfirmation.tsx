import { Custom, Input } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { useNavigate } from "react-router-dom";
import { Enums, Routes } from "utils";
import { Box, Stack } from "@mui/material";
import { IUser } from "interfaces";

export type AccountConfirmationForm = {
  code: string;
};

export const AccountConfirmationInitialState: AccountConfirmationForm = {
  code: "",
};

export const AccountConfirmation = (props: any) => {
  const { theme } = useTheme();
  const { auth } = useService();
  const navigate = useNavigate();
  const { t, user, setFeedback, setUser } = useApp();

  const { onInput, onSubmit, values } = useForm<AccountConfirmationForm>(
    AccountConfirmationInitialState,
    undefined,
    submitCallback
  );

  async function submitCallback() {
    const { code }: AccountConfirmationForm = values;
    const { status, payload } = await auth.accountConfirmation(
      user.email,
      code.toLowerCase()
    );

    if (status === Enums.EnumResponse.Success) {
      setUser({ active: true } as IUser);
      navigate(Routes.map.home);
    } else {
      return setFeedback({
        message: t.message.auth.code_mismatch,
        severity: Enums.EnumFeedback.Error,
      });
    }
  }

  async function handleResendEmail() {
    await auth.resendConfirmationEmail(user.email);
    setFeedback({
      message: t.message.auth.email_resent,
      severity: Enums.EnumFeedback.Info,
    });
  }

  return (
    <Box component="form" onSubmit={onSubmit} className="al-form">
      <Stack spacing={theme.spacing.md} alignItems="center">
        <Input.VerificationCode name="code" count={6} onInput={onInput} />
        <Stack width={1} direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
            <Custom.Typography>
              {t.page.auth.account_confirmation.has_not_received}
            </Custom.Typography>
            <Box
              onClick={handleResendEmail}
              color={theme.palette.font.color}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {t.action.resend}
            </Box>
          </Stack>
          <Custom.Button submit>{t.action.submit}</Custom.Button>
        </Stack>
      </Stack>
    </Box>
  );
};
