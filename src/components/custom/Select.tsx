import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { Validations } from "helpers";
import { PairValue } from "types";
import { useTheme } from "contexts";

type Props = {
  sx?: any;
  id?: string;
  name?: string;
  label?: string;
  items: PairValue[];
  disabled?: boolean;
  value?: string | "";
  onChange?: (value: string) => void;
  onDropdownChange?: (event: SelectChangeEvent<string>) => void;
};

export const Select = (props: Props) => {
  const { theme } = useTheme();
  const [value, setValue] = useState<string | "">(props.value ?? "");

  useEffect(() => setValue(props.value ?? ""), [props.value]);

  const handleChange = (value: string): void => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const handleDropdownChange = (event: SelectChangeEvent<string>): void =>
    props.onDropdownChange && props.onDropdownChange(event);

  return (
    <>
      {props.items && (
        <FormControl
          variant="outlined"
          sx={{ width: 1, display: "flex", flexDirection: "row" }}
        >
          {props.label && (
            <InputLabel
              id={props.id}
              sx={{
                color: props.disabled
                  ? theme.palette.background.accent
                  : theme.palette.font.color,
              }}
            >
              {props.label}
            </InputLabel>
          )}
          <MUISelect
            value={value}
            name={props.name}
            labelId={props.id}
            disabled={props.disabled}
            onChange={handleDropdownChange}
            input={<OutlinedInput label={props.label} />}
            sx={{
              width: 1,
              "& .MuiSelect-icon": {
                color: props.disabled
                  ? theme.palette.background.accent
                  : theme.palette.font.color,
              },
              "& .MuiFormLabel-root": {
                color: theme.palette.font.color,
              },
              "& .MuiSelect-select": {
                color: theme.palette.font.color,
              },
            }}
            MenuProps={{
              MenuListProps: {
                sx: {
                  color: theme.palette.font.color,
                  backgroundColor: theme.palette.background.accent,
                },
              },
            }}
          >
            {props.items.map((item: PairValue) => (
              <MenuItem
                key={item.key}
                value={item.key}
                onClick={() => handleChange(item.key)}
              >
                {item.value}
              </MenuItem>
            ))}
          </MUISelect>
        </FormControl>
      )}
    </>
  );
};
