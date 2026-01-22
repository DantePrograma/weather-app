import { useEffect, useMemo, useState } from "react";
import type { Result } from "../components/Form";
import { useWeatherApi } from "./useWeatherApi";

export const useWeather = () => {
  const [selectedCity, setSelectedCity] = useState<Result | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const { weather, loading, error, fetchWeather } = useWeatherApi(units);

  const handleSwitch = () => {
    if (units == "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  };

  useEffect(() => {
    if (!selectedCity) return;

    const controller = new AbortController();
    fetchWeather(selectedCity, controller.signal);

    return () => controller.abort();
  }, [selectedCity, fetchWeather]);

  let prettyDate = "";

  if (weather?.current?.time) {
    prettyDate = new Date(weather.current.time).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const days = useMemo(() => {
    if (!weather?.daily) return [];
    return weather.daily.time.map((date) =>
      new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    );
  }, [weather]);

  const hourlyData = useMemo(() => {
    if (!weather || !weather.hourly) return [];

    const dayIndex = weather.daily.time.findIndex((dateStr) => {
      const dayName = new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
      });
      return dayName === selectedDay;
    });

    if (dayIndex === -1) return [];

    const startIndex = dayIndex * 24;
    const endIndex = startIndex + 24;

    return weather.hourly.time
      .slice(startIndex, endIndex)
      .map((time, index) => {
        const actualIndex = startIndex + index;
        return {
          time: time,
          temp: weather.hourly.temperature_2m[actualIndex],
          code: weather.hourly.weather_code[actualIndex],
        };
      });
  }, [weather, selectedDay]);

  const handleRetry = () => {
    if (!selectedCity) return;

    const controller = new AbortController();
    fetchWeather(selectedCity, controller.signal);
  };
  return {
    weather,
    loading,
    error,
    units,
    handleSwitch,
    fetchWeather,
    selectedDay,
    selectedCity,
    days,
    setSelectedCity,
    setSelectedDay,
    prettyDate,
    handleRetry,
    hourlyData,
  };
};
