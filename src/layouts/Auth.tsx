import "assets/scss/layouts/auth.scss";

import { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Custom } from "components";
import { useApp, ServiceProvider, useTheme } from "contexts";
import { ThemeProvider } from "@mui/material/styles";
import { Constants, Themes } from "utils";
import { Validations } from "helpers";

export const AuthLayout = () => {
  const { theme } = useTheme();
  const { feedback, setFeedback } = useApp();

  const hasMessage = feedback && Validations.hasValue(feedback.message);

  useEffect(() => {
    if (hasMessage) {
      const timeout = setTimeout(
        () => setFeedback(null),
        Constants.REFRESH_RATE.ALERT
      );
      return () => clearTimeout(timeout);
    }
  }, [hasMessage]);

  return (
    <ServiceProvider>
      <ThemeProvider theme={Themes.defaultTheme(theme)}>
        <Box
          className="al-auth"
          color={theme.palette.font.color}
          bgcolor={theme.palette.background.color}
        >
          <Box className="al-container">
            <Box className="al-header">
              {hasMessage && (
                <Custom.Alert
                  variant="filled"
                  severity={feedback?.severity ?? undefined}
                >
                  {feedback?.message}
                </Custom.Alert>
              )}
            </Box>
            <Box
              className="al-content"
              color={theme.palette.font.accent}
              bgcolor={theme.palette.background.accent}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ServiceProvider>
  );
};
