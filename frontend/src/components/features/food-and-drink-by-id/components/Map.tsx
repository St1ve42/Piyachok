'use client'
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import {Route} from "@gravity-ui/icons"
import { FC, useEffect, useState } from "react";
import Control from 'react-leaflet-custom-control'
import { GetCoordinatesDto, utils } from "@/src/services/utils.service";
import L from "leaflet";

type coordinatesType = [number, number]

type PropsType = {
  foodAndDrinkPosition: coordinatesType,
  foodAndDrinkLocationInfo: GetCoordinatesDto
}

const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export const calculateDistance = (
    point1: [number, number],
    point2: [number, number]
): string => {
    const latLng1 = L.latLng(point1);
    const latLng2 = L.latLng(point2);

    const distanceInMeters = latLng1.distanceTo(latLng2);

    if (distanceInMeters < 1000) {
        return `${Math.round(distanceInMeters)} м`;
    }

    return `${(distanceInMeters / 1000).toFixed(2)} км`;
};

function RecenterButton({centerPosition}: {centerPosition: [number, number]}) {
  const map = useMap();

  const handleRecenter = () => {
    map.setView(centerPosition, 15);
  };

  return <button className="bg-white cursor-pointer h-[25px]" onClick={handleRecenter}>📍</button>
}

function FitBoundsHandler({ foodAndDrinkPosition, userPosition}: {foodAndDrinkPosition: [number, number], userPosition?: [number, number]}) {
  const map = useMap();
  useEffect(() => {
    if (userPosition) {
      const bounds = L.latLngBounds([foodAndDrinkPosition, userPosition]);

      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [userPosition]);

  return null;
}

const Map: FC<PropsType> = ({foodAndDrinkPosition, foodAndDrinkLocationInfo}) => {
  const [userPosition, setUserPosition] = useState<undefined | [number, number]>(undefined)
  const [distanceText, setDistanceText] = useState<undefined | string>(undefined)
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const middlePoint: [number, number] | undefined = userPosition ? [
        (userPosition[0] + foodAndDrinkPosition[0]) / 2,
        (userPosition[1] + foodAndDrinkPosition[1]) / 2,
    ] : undefined;
  const handleConfirmLocation: PositionCallback = ({coords: {longitude, latitude}}) => {
      const userPos: [number, number] = [latitude, longitude]
      setUserPosition([latitude, longitude])
      setDistanceText(calculateDistance(foodAndDrinkPosition, userPos))
  }

  const handleRejectLocation: PositionErrorCallback = async () => {
      const response = await utils.getCoordinates(foodAndDrinkLocationInfo)
      if(response.success){
        const {data: {lng, lat}} = response
        const userPos: [number, number] = [lat, lng]
        setUserPosition(userPos)
        setDistanceText(calculateDistance(foodAndDrinkPosition, userPos))
      }
  }

  const handleRouteClick = () => {
    if (!navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(handleConfirmLocation, handleRejectLocation)
  }
  return <MapContainer center={foodAndDrinkPosition} zoom={15} scrollWheelZoom={true} className="h-[21rem] z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Control prepend position='topright'>
        <div className="flex flex-col gap-2">
          <Route className="bg-white cursor-pointer" width={25} height={25} onClick={handleRouteClick}/>
          <RecenterButton centerPosition={foodAndDrinkPosition}/>
        </div>
      </Control>
      <Marker position={foodAndDrinkPosition} icon={customIcon}/>
      {userPosition && <Marker position={userPosition} icon={customIcon}/>}
      {userPosition && <Polyline positions={[foodAndDrinkPosition, userPosition]} eventHandlers={{
          mouseover: () => {
              setIsPopupOpen(true);
          },
      }}/>}
      {userPosition && distanceText && middlePoint && isPopupOpen && <Popup position={middlePoint} closeButton={false} autoClose={false} eventHandlers={{
          remove: () => setIsPopupOpen(false)
      }}>
          <div className="text-center font-semibold text-neutral-900">
              {distanceText}
          </div>
      </Popup>}
      <FitBoundsHandler foodAndDrinkPosition={foodAndDrinkPosition} userPosition={userPosition}/>
    </MapContainer>;
};

export default Map;
