import { useApp, useTheme } from "contexts";
import { Common, Custom, Form } from "components";
import { Box, Stack } from "@mui/material";
import { Logo } from "assets/images";

export const ResetPassword = () => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <Box className="al-page">
      <Stack className="al-wrapper" spacing={theme.spacing.md}>
        <Box className="al-brand">
          <Common.Image src={Logo} alt="Brand" />
        </Box>
        <Box className="al-header" color={theme.palette.font.color}>
          <Custom.Typography className="title">
            {t.page.auth.reset_password.title}
          </Custom.Typography>
          <Custom.Typography className="description">
            {t.message.auth.reset_password}
          </Custom.Typography>
          <Box component="ul" className="list">
            {t.message.auth.password_rule.map((item: string, i: number) => {
              return (
                <Box component="li" key={i}>
                  <Custom.Typography
                    size={theme.font.sm}
                    weight={theme.font.normal}
                    color={theme.palette.font.color}
                  >
                    {item}
                  </Custom.Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box className="al-content">
          <Form.ResetPassword />
        </Box>
      </Stack>
    </Box>
  );
};
