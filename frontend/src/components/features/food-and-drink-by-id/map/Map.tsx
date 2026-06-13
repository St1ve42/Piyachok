'use client'
import {
  CircleMarker,
  MapContainer,
  Polyline,
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
  const handleConfirmLocation: PositionCallback = ({coords: {longitude, latitude}}) => {
      setUserPosition([latitude, longitude])
  }

  const handleRejectLocation: PositionErrorCallback = async () => {
      const response = await utils.getCoordinates(foodAndDrinkLocationInfo)
      if(response.success){
        const {data: {lng, lat}} = response
        setUserPosition([lat, lng])
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
      <CircleMarker radius={5} center={foodAndDrinkPosition}/>
      {userPosition && <CircleMarker radius={5} center={userPosition}/>}
      {userPosition && <Polyline positions={[foodAndDrinkPosition, userPosition]}/>}
      <FitBoundsHandler foodAndDrinkPosition={foodAndDrinkPosition} userPosition={userPosition}/>
    </MapContainer>;
};

export default Map;
