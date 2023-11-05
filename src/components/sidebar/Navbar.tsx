import { Box, Stack } from "@mui/material";
import { Sidebar } from "components";
import { useApp, useMap, useTheme } from "contexts";
import { Enums } from "utils";
import { Coordinate } from "types";
import { Logo } from "assets/images";

// icons
import { BookmarkRounded, SearchRounded } from "@mui/icons-material";

export const Navbar = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { menu, setCoordinate, setMenu } = useMap();

  function handleClick(selected: Enums.EnumMenu) {
    setMenu(menu === selected ? Enums.EnumMenu.Map : selected);
  }

  function handleMenuClose() {
    setMenu(Enums.EnumMenu.Map);
  }

  function handleCoordinate(coordinate: Coordinate) {
    handleMenuClose();
    setCoordinate(coordinate);
  }

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 11,
        position: "fixed",
        backgroundColor: theme.palette.theme,
      }}
    >
      <Stack height={1} direction="row">
        <Box
          sx={{
            height: 1,
            borderRight: 1,
            width: theme.component.navbar.width,
            borderRightColor: theme.palette.border,
            boxShadow:
              "0 1px 2px rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)",
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            width={theme.component.navbar.width}
            height={theme.component.navbar.width}
          >
            <Logo width={40} height={40} />
          </Stack>
          <Sidebar.NavbarItem
            label={t.title.search}
            onClick={handleClick}
            menu={Enums.EnumMenu.Search}
            selected={menu === Enums.EnumMenu.Search}
          >
            <SearchRounded />
          </Sidebar.NavbarItem>
          <Sidebar.NavbarItem
            label={t.title.saved_list}
            onClick={handleClick}
            menu={Enums.EnumMenu.SavedList}
            selected={menu === Enums.EnumMenu.SavedList}
          >
            <BookmarkRounded />
          </Sidebar.NavbarItem>
        </Box>
        {menu !== Enums.EnumMenu.Map && (
          <Box height={1} width={300} position="relative">
            {menu === Enums.EnumMenu.Search && (
              <Sidebar.Search
                onClose={handleMenuClose}
                onClick={handleCoordinate}
                type={Enums.EnumMapboxType.All}
              />
            )}
            {menu === Enums.EnumMenu.SavedList && (
              <Sidebar.SavedList
                onClose={handleMenuClose}
                onGo={handleCoordinate}
              />
            )}
          </Box>
        )}
      </Stack>
    </Box>
  );
};
