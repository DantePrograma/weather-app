import { useEffect, useState } from "react";
import type { Result } from "../components/Form";

export const useGeolocation = () => {
  const [location, setLocation] = useState<Result | null>(null);
  const [locationDenied, setLocationDenied] = useState(
    () => !("geolocation" in navigator),
  );

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          name: "Your location",
          country: "",
          id: 0,
          elevation: 0,
          feature_code: "",
          country_code: "",
          admin1_id: 0,
          timezone: "",
          country_id: 0,
          admin1: "",
        });
      },
      () => setLocationDenied(true),
    );
  }, []);

  return { location, locationDenied };
};
