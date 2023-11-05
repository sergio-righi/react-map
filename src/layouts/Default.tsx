import "assets/scss/layouts/default.scss";

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { MapProvider, ServiceProvider, useTheme } from "contexts";
import { ThemeProvider } from "@mui/material/styles";
import { Themes } from "utils";
import { Sidebar } from "components";

export const DefaultLayout = () => {
  const { theme } = useTheme();

  return (
    <ServiceProvider>
      <ThemeProvider theme={Themes.defaultTheme(theme)}>
        <MapProvider>
          <Box>
            <Sidebar.Navbar />
            <Outlet />
          </Box>
        </MapProvider>
      </ThemeProvider>
    </ServiceProvider>
  );
};
