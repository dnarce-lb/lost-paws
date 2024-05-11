'use client';

import { useEffect } from 'react';
import { LatLng } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useState } from 'react';

export type RawResult = {
  lat: number;
  lng: number;
  formattedAddress: string;
};

const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(new LatLng(0, 0));
  const [selectedPlace, setSelectedPlace] = useState<RawResult | null>(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const provider = new OpenStreetMapProvider();
  const [addreesses, setAddresses] = useState([] as any[]);

  const lookupAddress = async (address: string) => {
    const response = await provider.search({ query: address });
    setAddresses(response);
  };
  const lookupLatLng = async (latLng: LatLng) => {
    const response = await provider.search({ query: `${latLng.lat},${latLng.lng}` });
    setAddresses(response);
    if (response.length > 0) {
      setFormattedAddress(response[0].label);
    }
  };

  useEffect(() => {
    (async () => {
      await lookupAddress(formattedAddress);
    })();
  }, [formattedAddress]);

  const getMyLocation = async () => {
    return await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async position => {
          await lookupLatLng(new LatLng(position.coords.latitude, position.coords.longitude));
          setCurrentLocation(new LatLng(position.coords.latitude, position.coords.longitude));
          resolve('ok');
          setLoading(false);
        });
      } else {
        setLoading(false);
        reject('Geolocation is not supported by this browser.');
      }
    });
  };

  const selectPlace = (place: RawResult | null) => {
    if (place) {
      setFormattedAddress(place.formattedAddress);
    }
    setSelectedPlace(place);
    setAddresses([]);
  };

  return {
    currentLocation,
    selectedPlace,
    addreesses,
    formattedAddress,
    getMyLocation,
    setFormattedAddress,
    selectPlace,
    loading,
  };
};

export default useLocation;
