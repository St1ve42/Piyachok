import { useState } from 'react';

export const useGeolocation = () => {
    const [location, setLocation] = useState<{lat: number | null, lng: number | null}>({ lat: null, lng: null });
    const [error, setError] = useState<string | null>(null);
    const handleSuccess = (position: GeolocationPosition) => {
        setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        });
    };

    const handleError = (err: GeolocationPositionError) => {
        setError(err.message);
    };

    return { location, error, handleSuccess, handleError };
};

export default useGeolocation