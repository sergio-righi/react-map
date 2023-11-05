import { Stack } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";
import { Enums } from "utils";

type Props = {
  label: string;
  selected: boolean;
  menu: Enums.EnumMenu;
  children: React.ReactNode;
  onClick: (menu: Enums.EnumMenu) => void;
};

export const NavbarItem = (props: Props) => {
  const { theme } = useTheme();

  function handleClick() {
    props.onClick && props.onClick(props.menu);
  }

  return (
    <Stack
      width={1}
      alignItems="center"
      gap={theme.spacing.xs}
      justifyContent="center"
      height={theme.component.navbar.width}
      color={
        props.selected ? theme.color.accent.color : theme.color.primary.color
      }
      onClick={handleClick}
      sx={{ cursor: "pointer" }}
    >
      {props.children}
      <Custom.Typography
        size={theme.font.xs}
        weight={theme.font.medium}
        color={
          props.selected ? theme.color.accent.color : theme.color.primary.color
        }
      >
        {props.label}
      </Custom.Typography>
    </Stack>
  );
};
