import { Stack } from "@mui/material";
import { useApp, useMap, useTheme } from "contexts";
import { Button, Popup } from "components";
import { Enums } from "utils";
import { Coordinate } from "types";

// icons
import { ListRounded, SearchRounded } from "@mui/icons-material";

type Props = {};

export const Menu = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { menu, setCoordinate, setMenu } = useMap();

  function handleMenuClose() {
    setMenu(Enums.EnumMenu.Map);
  }

  function handleCoordinate(coordinate: Coordinate) {
    handleMenuClose();
    setCoordinate(coordinate);
  }

  function handleSearchClick(state: boolean) {
    setMenu(state ? Enums.EnumMenu.Search : Enums.EnumMenu.Map);
  }

  function handleSavedListClick(state: boolean) {
    setMenu(state ? Enums.EnumMenu.SavedList : Enums.EnumMenu.Map);
  }

  return (
    <>
      <Stack
        direction="column"
        spacing={theme.spacing.lg}
        sx={{
          zIndex: 2,
          position: "fixed",
          top: theme.spacing.default,
          left: theme.spacing.default,
        }}
      >
        {[
          Enums.EnumMenu.Map,
          Enums.EnumMenu.Search,
          Enums.EnumMenu.SavedList,
        ].includes(menu) && (
          <>
            <Button.ToggleButton
              tooltip={t.title.search}
              onClick={handleSearchClick}
              active={menu === Enums.EnumMenu.Search}
            >
              <SearchRounded />
            </Button.ToggleButton>
            <Button.ToggleButton
              tooltip={t.title.saved_list}
              onClick={handleSavedListClick}
              active={menu === Enums.EnumMenu.SavedList}
            >
              <ListRounded />
            </Button.ToggleButton>
          </>
        )}
      </Stack>
      <Popup.Search
        open={menu === Enums.EnumMenu.Search}
        onClose={handleMenuClose}
        onClick={handleCoordinate}
        type={Enums.EnumMapboxType.All}
      />
      <Popup.SavedList
        open={menu === Enums.EnumMenu.SavedList}
        onClose={handleMenuClose}
        onGo={handleCoordinate}
      />
    </>
  );
};
