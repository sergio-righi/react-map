import { useEffect } from "react";
import { useMap, useService, useTheme } from "contexts";
import { Map } from "components";
import { Box } from "@mui/material";

type Props = {};

export const Home = (props: Props) => {
  const { theme } = useTheme();
  const { lead } = useService();
  const {
    coordinate,
    markers,
    setSavedLists,
    setMarkers,
    setStatus,
    setStatuses,
    status,
    statuses,
  } = useMap();

  useEffect(() => {
    fetchStatuses();
    fetchMarkers();
    fetchLists();
  }, []);

  async function fetchStatuses() {
    setStatuses(await lead.statuses());
  }

  async function fetchMarkers() {
    setMarkers(await lead.markers());
  }

  async function fetchLists() {
    setSavedLists(await lead.savedLists());
  }

  function handleSelect(status: string) {
    setStatus(status);
  }

  return (
    <Box minHeight="100vh" bgcolor={theme.palette.background.color}>
      <Map.View
        markers={markers()}
        statuses={statuses}
        coordinate={coordinate}
        onSelect={handleSelect}
        status={status}
      />
    </Box>
  );
};
