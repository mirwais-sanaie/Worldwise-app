import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../contexts/CitiesContextPro";
import { useUrl } from "../hooks/useUrl";

function Map() {
  const { cities } = useCitiesContext();
  const [mapPosition, setMapPoition] = useState([43, -7]);
  const {
    isLoading: isLoadingPos,
    position: locPostion,
    // error: mapError,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrl();

  useEffect(
    function () {
      if ((mapLat, mapLng)) {
        setMapPoition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (locPostion) {
        setMapPoition([locPostion.lat, locPostion.lng]);
      }
    },
    [locPostion]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type={"position"} onClick={getPosition}>
        {isLoadingPos ? "Loading" : "Use Your Position"}
      </Button>

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position[0] !== undefined && position[1] !== undefined) {
      map.setView(position, map.getZoom());
    }
  }, [map, position]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e?.latlng.lat}&lng=${e?.latlng.lng}`);
    },
  });
}

export default Map;
