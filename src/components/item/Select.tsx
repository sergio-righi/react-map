import React, { useState } from "react";
import { useApp } from "contexts";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { PairValue } from "types";

type Props = {
  name?: string;
  value?: string;
  items: PairValue[];
  leading?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = ({ value = "", items = [], ...props }: Props) => {
  const { t } = useApp();
  const [currentValue, setCurrentValue] = useState<string>(value);

  function handleChange(event: SelectChangeEvent<string>) {
    setCurrentValue(String(event.target.value));
    props.onChange &&
      props.onChange({
        target: { name: props.name, value: event.target.value },
      } as any);
  }

  return (
    <ListItem>
      {props.leading && <ListItemIcon>{props.leading}</ListItemIcon>}
      <ListItemText>
        <MUISelect
          sx={{
            width: 1,
            margin: 0,
            padding: 0,
            "& .MuiSelect-select": {
              padding: 0,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "0 !important",
            },
            "& .MuiSelect-icon": {
              display: "none",
            },
          }}
          value={currentValue}
          onChange={handleChange}
          placeholder={t.placeholder.not_set}
        >
          {/* TODO : should be improved */}
          <MenuItem key={0} value={0}>
            {t.placeholder.not_set}
          </MenuItem>
          {items.map((option: PairValue) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </MUISelect>
      </ListItemText>
    </ListItem>
  );
};
