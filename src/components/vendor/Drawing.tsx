import { forwardRef, useCallback, useEffect, useState } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { MapRef, useControl, ControlPosition } from "react-map-gl";

type Props = ConstructorParameters<typeof MapboxDraw>[0] & {
  coordinate?: ControlPosition;
  onPolygonComplete: (polygon: any) => void;
};

export const Drawing = forwardRef(
  (props: Props, ref: React.Ref<MapRef | null>) => {
    const [features, setFeatures] = useState({});

    const onUpdate = useCallback((e: any) => {
      setFeatures((currFeatures: any) => {
        const newFeatures = { ...currFeatures };
        for (const f of e.features) {
          newFeatures[f.id] = f;
        }
        return newFeatures;
      });
    }, []);

    const onDelete = useCallback((e: any) => {
      setFeatures((currFeatures: any) => {
        const newFeatures = { ...currFeatures };
        for (const f of e.features) {
          delete newFeatures[f.id];
        }
        return newFeatures;
      });
    }, []);

    useEffect(
      () => props.onPolygonComplete && props.onPolygonComplete(features),
      [features]
    );

    useControl<MapboxDraw>(
      () => new MapboxDraw(props),
      () => {
        if (ref && "current" in ref) {
          ref.current?.on("draw.create", onUpdate);
          ref.current?.on("draw.update", onUpdate);
          ref.current?.on("draw.delete", onDelete);
        }
      },
      () => {
        if (ref && "current" in ref) {
          ref.current?.off("draw.create", onUpdate);
          ref.current?.off("draw.update", onUpdate);
          ref.current?.off("draw.delete", onDelete);
        }
      },
      {
        position: "top-right",
      }
    );

    return null;
  }
);
