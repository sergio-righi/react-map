import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "contexts";
import { Constants, Routes } from "utils";
import { Custom } from "components";
import { Box, Stack } from "@mui/material";
import { Light } from "themes";
import { Combines } from "helpers";
import { Outlet } from "react-router-dom";

type Props = {};

export const EmptyLayout = (props: Props) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => setTheme(Light), []);

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.palette.background.accent}
    >
      <Outlet />
    </Box>
  );
};
