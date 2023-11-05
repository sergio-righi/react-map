import React, { useEffect, useState } from "react";
import { useTheme } from "contexts";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { Progress } from "components";
import { Coordinate } from "types";
import { GeocodeFeature } from "@mapbox/mapbox-sdk/services/geocoding";

type Props = {
  items: GeocodeFeature[];
  onClick: (coordinate: Coordinate) => void;
};

export const SearchResult = (props: Props) => {
  const { theme } = useTheme();
  const [searchResult, setSearchResult] = useState<GeocodeFeature[]>([]);

  useEffect(() => setSearchResult(props.items), [props.items]);

  function handleClick(item: GeocodeFeature) {
    if ("center" in item && item.center.length === 2) {
      props.onClick &&
        props.onClick({ lat: item.center[1], lng: item.center[0] });
    }
  }

  return searchResult.length > 0 ? (
    <List>
      {searchResult.map((item: GeocodeFeature) => (
        <ListItemButton key={item.id} onClick={() => handleClick(item)}>
          <ListItemText
            primary={item.place_name}
            primaryTypographyProps={{ color: theme.palette.font.color }}
          />
        </ListItemButton>
      ))}
    </List>
  ) : (
    <Progress.NoRecord height={250} />
  );
};
