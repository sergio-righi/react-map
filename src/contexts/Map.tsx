import React, { createContext, useCallback, useContext } from "react";
import { IActivityStatus, IMarker, ISavedList } from "interfaces";
import { Coordinate } from "types";
import { Constants, Enums } from "utils";

interface ProvidedValueType {
  coordinate: Coordinate;
  setCoordinate: (coordinate: Coordinate) => void;
  editable: boolean;
  setEditable: (editable: boolean) => void;
  markers: () => IMarker[];
  setMarkers: (
    marker: IMarker | IMarker[] | string | undefined,
    savedListId?: string | null,
    isDeleted?: boolean
  ) => void;
  setMarkerSavedList: (
    markerId: string,
    newSavedListId: string,
    oldSavedListId: string | null
  ) => void;
  menu: Enums.EnumMenu;
  setMenu: (menu: Enums.EnumMenu) => void;
  savedList: ISavedList | null;
  setSavedList: (savedList: ISavedList | null) => void;
  savedLists: ISavedList[];
  setSavedLists: (
    savedList: ISavedList | ISavedList[] | string | undefined,
    markerId?: string | null
  ) => void;
  status: string;
  setStatus: (status: string) => void;
  statuses: IActivityStatus[];
  setStatuses: (statuses: IActivityStatus[]) => void;
}

const initState = {
  coordinate: {
    lat: Constants.MAPBOX.LATITUDE,
    lng: Constants.MAPBOX.LONGITUDE,
  } as Coordinate,
  editable: true,
  markers: [] as IMarker[],
  menu: Enums.EnumMenu.Map,
  savedList: null,
  savedLists: [] as ISavedList[],
  status: "",
  statuses: [] as IActivityStatus[],
};

export const MapContext = createContext<ProvidedValueType>({
  coordinate: initState.coordinate,
  setCoordinate: () => {},
  editable: false,
  setEditable: () => {},
  markers: () => [],
  setMarkers: () => {},
  setMarkerSavedList: () => {},
  menu: initState.menu,
  setMenu: () => {},
  savedList: null,
  setSavedList: () => {},
  savedLists: initState.savedLists,
  setSavedLists: () => {},
  status: initState.status,
  setStatus: () => {},
  statuses: initState.statuses,
  setStatuses: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export const MapProvider = React.memo<Props>(({ children }: Props) => {
  const [pins, setPins] = React.useState<IMarker[]>([]);
  const [coordinate, setCoordinate] = React.useState<Coordinate>(
    initState.coordinate
  );
  const [editable, setEditable] = React.useState<boolean>(initState.editable);
  const [menu, setMenu] = React.useState<Enums.EnumMenu>(initState.menu);
  const [savedList, setSavedList] = React.useState<ISavedList | null>(
    initState.savedList
  );
  const [savedLists, setSavedLists] = React.useState<ISavedList[]>(
    initState.savedLists
  );
  const [status, setStatus] = React.useState<string>(initState.status);
  const [statuses, setStatuses] = React.useState<IActivityStatus[]>(
    initState.statuses
  );

  /**
   * TODO : make this more efficient
   * it combines the loose markers with the ones of the checked saved lists
   */

  const markers = useCallback(() => {
    const filteredSavedLists = savedLists
      .filter((item: ISavedList) => !item.hidden)
      .map((item: ISavedList) => item.id);
    return pins.filter(
      (item: IMarker) =>
        item.savedListId === null ||
        filteredSavedLists.includes(item.savedListId)
    );
  }, [pins, savedLists]);

  /**
   * function to lookup for an item in the list
   * @param {string} id id to be found
   * @param {ISavedList[] | IMarker[]} list the list to be iterated
   * @returns the index of the item in the list or -1 if not found
   */

  const existsIn = (id: string, list: ISavedList[] | IMarker[] | string[]) =>
    list.findIndex((item: ISavedList | IMarker | string) =>
      typeof item === "string" ? item === id : item.id === id
    );

  /**
   * function to iterate through the list of saved lists
   * if one item: check if it exists in the list, if not, push it to the list
   * if an array: it pushes into the list
   * if a string: check if it exists in the list, if not, push it to the list
   * if undefined: do nothing
   */

  const setSavedListsCallback = useCallback(
    (
      newSavedLists: ISavedList | ISavedList[] | string | undefined,
      markerId?: string | null
    ) => {
      if (!newSavedLists) return;
      setSavedLists((currentSavedList: ISavedList[]) => {
        const cpySavedLists = [...currentSavedList];
        if (typeof newSavedLists === "string") {
          const index = existsIn(newSavedLists, cpySavedLists);
          if (index !== -1) cpySavedLists.splice(index, 1);
        } else if (Array.isArray(newSavedLists)) {
          cpySavedLists.push(...newSavedLists);
        } else {
          const index = existsIn(newSavedLists.id, cpySavedLists);
          if (index === -1) {
            // TODO : it must be revised and made more efficient
            // it adds the marker to the saved list when creating the new list from the marker
            if (markerId) {
              setPins((currentPins: IMarker[]) => {
                newSavedLists.markers.push(markerId);
                const index = existsIn(markerId, currentPins);
                setMarkerSavedListCallback(
                  markerId,
                  newSavedLists.id,
                  currentPins[index]?.savedListId
                );
                return currentPins;
              });
            }

            cpySavedLists.push(newSavedLists);
          } else
            cpySavedLists[index] = {
              ...cpySavedLists[index],
              ...newSavedLists,
            };
        }
        return cpySavedLists;
      });
    },
    []
  );

  /**
   * function to iterate through the list of "loose" markers
   * if one item: check if it exists in the list, if not, push it to the list
   * if an array: it pushes into the list
   * if a string: check if it exists in the list, if not, push it to the list
   * if undefined: do nothing
   * @param {IMarker | IMarker[] | string | undefined}
   * @returns
   */

  const setMarkersCallback = useCallback(
    (
      newMarkers: IMarker | IMarker[] | string | undefined,
      savedListId?: string | null,
      isDeleted: boolean = true
    ) => {
      if (!newMarkers) return;

      // it must remove from the saved list
      if (typeof newMarkers === "string" && savedListId) {
        setSavedLists((currentSavedLists: ISavedList[]) => {
          const cpySavedLists = [...currentSavedLists];
          const index = existsIn(savedListId, cpySavedLists);
          if (index !== -1) {
            const markerIndex = existsIn(
              newMarkers,
              cpySavedLists[index].markers
            );
            cpySavedLists[index].markers.splice(markerIndex, 1);
          }
          return cpySavedLists;
        });
      }

      if (isDeleted) {
        // it does add/remove according to the type of parameter given
        setPins((currentMarkers: IMarker[]) => {
          const cpyMarkers = [...currentMarkers];
          if (typeof newMarkers === "string") {
            const index = existsIn(newMarkers, cpyMarkers);
            if (index !== -1) cpyMarkers.splice(index, 1);
          } else if (Array.isArray(newMarkers)) {
            cpyMarkers.push(...newMarkers);
          } else {
            const index = existsIn(newMarkers.id, cpyMarkers);
            if (index === -1) cpyMarkers.push(newMarkers);
            else cpyMarkers[index] = { ...cpyMarkers[index], ...newMarkers };
          }
          return cpyMarkers;
        });
      } else {
        // it does remove from the saved list
        setPins((currentMarkers: IMarker[]) => {
          const cpyMarkers = [...currentMarkers];
          if (typeof newMarkers === "string") {
            const index = existsIn(newMarkers, cpyMarkers);
            if (index !== -1) cpyMarkers[index].savedListId = null;
          }
          return cpyMarkers;
        });
      }
    },
    []
  );

  /**
   * TODO : it must be revised and made more efficient
   * function to iterate through the saved lists and move the marker accordingly
   * if the marker is currently loose, it gets from the loose list and pushes it to the saved list given
   * if the marker is currently saved, it gets from the saved list and pushes it to the saved list given
   * @param {string} markerId the id of the marker to be updated
   * @param {string} newSavedListId the id of the list to be moved to
   * @param {string} oldSavedListId the id of the list to be moved from
   * @returns
   */

  const setMarkerSavedListCallback = useCallback(
    (
      markerId: string,
      newSavedListId: string,
      oldSavedListId: string | null
    ) => {
      if (newSavedListId === oldSavedListId) return;

      setPins((currentPins: IMarker[]) => {
        // Create new copies of the pin list to ensure immutability
        const cpyPins = [...currentPins];

        setSavedLists((currentSavedLists: ISavedList[]) => {
          // Create new copies of the saved list to ensure immutability
          const cpySavedLists = [...currentSavedLists];

          // Find the marker to move and update
          let markerToMove: string | null = null;
          if (oldSavedListId) {
            const oldListIndex = existsIn(oldSavedListId, cpySavedLists);
            if (oldListIndex !== -1) {
              const markerIndex = cpySavedLists[oldListIndex].markers.findIndex(
                (item: string) => item === markerId
              );
              if (markerIndex !== -1) {
                markerToMove = cpySavedLists[oldListIndex].markers[markerIndex];
                // Remove the marker from the old list
                cpySavedLists[oldListIndex].markers.splice(markerIndex, 1);
              }
            }
          }

          // Find the index of the new saved list
          const newListIndex = existsIn(newSavedListId, cpySavedLists);
          if (newListIndex !== -1) {
            if (markerToMove) {
              // Update the savedListId of the marker and add it to the new list
              cpySavedLists[newListIndex].markers.push(markerToMove);
            } else {
              // If the marker wasn't found in any saved list, it's a loose marker
              // Remove it from the loose markers (pins) list and add it to the new list
              const looseMarkerIndex = cpyPins.findIndex(
                (item: IMarker) => item.id === markerId
              );
              if (looseMarkerIndex !== -1) {
                const markerToMove = cpyPins[looseMarkerIndex];
                cpySavedLists[newListIndex].markers.push(markerToMove.id);
                cpyPins.splice(looseMarkerIndex, 1);
              }
            }
          } else {
            const index = existsIn(markerId, cpyPins);
            if (index !== -1) {
              cpyPins[index].savedListId = newSavedListId;
            }
          }
          return cpySavedLists;
        });

        return cpyPins;
      });
    },
    []
  );

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValueType = {
      coordinate,
      setCoordinate,
      editable,
      setEditable,
      markers,
      setMarkers: setMarkersCallback,
      setMarkerSavedList: setMarkerSavedListCallback,
      menu,
      setMenu,
      status,
      setStatus,
      statuses,
      setStatuses,
      savedList,
      setSavedList,
      savedLists,
      setSavedLists: setSavedListsCallback,
    };
    return value;
  }, [
    coordinate,
    editable,
    markers,
    setMarkersCallback,
    setMarkerSavedListCallback,
    menu,
    status,
    statuses,
    savedList,
    savedLists,
    setSavedListsCallback,
  ]);

  return (
    <MapContext.Provider value={MemoizedValue}>{children}</MapContext.Provider>
  );
});

export const useMap = () => useContext(MapContext);
