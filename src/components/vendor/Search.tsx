import React from "react";
import { useApp } from "contexts";
import { Enums, Geocoder } from "utils";
import {
  GeocodeFeature,
  GeocodeQueryType,
} from "@mapbox/mapbox-sdk/services/geocoding";
import { Custom } from "components";

type Props = {
  type: Enums.EnumMapboxType;
  size?: "small" | "medium" | undefined;
  onSearch: (response: GeocodeFeature[]) => void;
};

export const Search = (props: Props) => {
  const { t } = useApp();

  async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const response = await Geocoder.searchEngine({
      query: event.target.value,
      limit: 5,
      countries: [],
      types: props.type.split(",") as GeocodeQueryType[],
    });
    props.onSearch && props.onSearch(response);
  }

  return (
    <Custom.TextField
      size={props.size}
      onChange={handleSearch}
      placeholder={t.placeholder.search_bar}
    />
  );
};
