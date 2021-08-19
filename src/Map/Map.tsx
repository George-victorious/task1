import React, {useEffect, useState} from "react";
import {GoogleMap, LoadScript, Marker, Polygon, Polyline} from "@react-google-maps/api";
import {ToastProvider, useToasts} from "react-toast-notifications";

const containerStyle = {
  width: "100%",
  height: "890px",
};

const Map = () => {
  const {addToast} = useToasts();
  const MINSK = {lat: 53.9006, lng: 27.559};
  const MOSCOW = {lat: 55.7558, lng: 37.6173};

  const [dotes, setDotes] = useState<any>([]);
  const [lines, setLines] = useState<any>([]);
  const [polygons, setPolygons] = useState<any>([]);
  const [rectanglesCenters, setRectanglesCenters] = useState<any>([]);
  const [angle, setAngle] = useState(0);

  const updatePath = (e: any, angle: number) => {
    function toRadians(angle: number) {
      return (angle * Math.PI) / 180;
    }

    function getIndexOfRect(lat: number, lng: number) {
      function inPoly(x: number, y: number, xp: number[], yp: number[]) {
        let j = 3;
        let c = false;
        for (let i = 0; i < 4; i++) {
          if (
            ((yp[i] <= y && y < yp[j]) || (yp[j] <= y && y < yp[i])) &&
            x > ((xp[j] - xp[i]) * (y - yp[i])) / (yp[j] - yp[i]) + xp[i]
          ) {
            c = !c;
          }
          j = i;
        }
        return c;
      }

      return polygons.findIndex((rect: any) => {
        let xp = rect.map((el: any) => el.lat);
        let yp = rect.map((el: any) => el.lng);
        return inPoly(lat, lng, xp, yp);
      });
    }

    const rectIndex = getIndexOfRect(e.latLng.lat(), e.latLng.lng());
    console.log(rectIndex);
    if (rectIndex === -1) return;
    const center = rectanglesCenters[rectIndex];
    const selectedRect = polygons[rectIndex];
    const newPath = selectedRect.map((cord: any, index: number) => {
      const {lat, lng} = cord;
      const r = Math.sqrt((center.lat - lat) ** 2 + (center.lng - lng) ** 2);
      return {
        lat: r * Math.cos(toRadians(angle + 90 * index + 45)) + center.lat,
        lng: r * Math.sin(toRadians(angle + 90 * index + 45)) + center.lng,
      };
    });
    const newArray = polygons.map((el: any, index: number) => {
      if (index === rectIndex) {
        return newPath;
      } else {
        return el;
      }
    });
    setPolygons(newArray);
  };
  const setDote = (e: any) => {
    setDotes((dotes: any) => [...dotes, {lat: e.latLng.lat(), lng: e.latLng.lng()}]);
  };
  const onMapClick = (e: any) => {
    if (e.domEvent.ctrlKey) {
      addToast("Clicked outside!", {appearance: "error", autoDismiss: true});
    } else {
      setDote(e);
    }
  };
  const incrementAngle = (e: any) => {
    setAngle(angle + 5);
    updatePath(e, angle + 5);
  };
  const decrementAngle = (e: any) => {
    //google.maps.MapMouseEvent
    if (e.domEvent.ctrlKey) {
      addToast("Clicked inside!", {appearance: "success", autoDismiss: true});
    } else {
      setAngle(angle - 5);
      updatePath(e, angle - 5);
    }
  };

  useEffect(() => {
    let newLines = [];
    for (let i = 1; i < dotes.length; i++) {
      newLines.push([dotes[i], dotes[i - 1]]);
    }
    if (dotes.length) {
      if (dotes.length < 4) {
        setLines(newLines);
      } else {
        setLines([]);
        const getCenter = (): {lng: number; lat: number} => {
          let firstCenter = {
            lat: (dotes[0].lat + dotes[2].lat) / 2,
            lng: (dotes[0].lng + dotes[2].lng) / 2,
          };
          let secondCenter = {
            lat: (dotes[1].lat + dotes[3].lat) / 2,
            lng: (dotes[1].lng + dotes[3].lng) / 2,
          };
          return {
            lat: (firstCenter.lat + secondCenter.lat) / 2,
            lng: (firstCenter.lng + secondCenter.lng) / 2,
          };
        };
        setRectanglesCenters((centers: any) => [...centers, getCenter()]);
        setPolygons((rectangles: any) => [...rectangles, dotes]);
        setDotes([]);
      }
    }
  }, [dotes]);

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: 0, lng: 0}}
        zoom={6}
        onClick={onMapClick}
      >
        <Marker position={MINSK} animation={1} />
        <Marker position={MOSCOW} animation={1} />
        <Polyline
          options={{
            strokeColor: "tomato",
          }}
          path={[MINSK, MOSCOW]}
        />
        {lines.map((line: any, index: number) => (
          <Polyline
            key={"polyline" + index}
            options={{
              strokeColor: "tomato",
            }}
            path={line}
          />
        ))}
        {polygons.map((rect: any, index: number) => (
          <Polygon
            key={"rectangle" + index}
            onClick={decrementAngle}
            onRightClick={incrementAngle}
            path={rect}
          />
        ))}
        <Marker
          key="marker_1"
          icon={{
            url: "https://cdn.mindbowser.com/custom_marker_pin.svg",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          position={{
            lat: 0,
            lng: 0,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

const FullMap = () => (
  <ToastProvider>
    <Map />
  </ToastProvider>
);

export default React.memo(FullMap);
