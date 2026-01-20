import { Form, type Result } from "./components/Form";
import { Header } from "./components/Header";
import sunnyIcon from "./assets/images/icon-sunny.webp";
import drizzleIcon from "./assets/images/icon-drizzle.webp";
import fogIcon from "./assets/images/icon-fog.webp";
import overCastIcon from "./assets/images/icon-overcast.webp";
import partlyCloudyIcon from "./assets/images/icon-partly-cloudy.webp";
import rainIcon from "./assets/images/icon-rain.webp";
import snowIcon from "./assets/images/icon-snow.webp";
import stormIcon from "./assets/images/icon-storm.webp";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Dropdown } from "./icons/Dropdown";
import { ErrorComponent } from "./components/Error";
import { SkeletonLoader } from "./components/SkeletonLoader";

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weather_code: string;
  wind_speed_10m: string;
  apparent_temperature: string;
  relative_humidity_2m: string;
  precipitation: string;
}

export interface Daily {
  time: Date[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weather_code: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  weather_code: string;
  precipitation_probability: string;
}

function App() {
  const [selectedCity, setSelectedCity] = useState<Result | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [activeDaysMenu, setActiveDaysMenu] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  const handleSwitch = () => {
    if (units == "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  };

  const unitsQuery =
    units === "imperial"
      ? "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch"
      : "";

  const fetchData = useCallback(
    async (city: Result, signal: AbortSignal) => {
      const url = `https://api.open-meteo.com/v1/forecast
?latitude=${city.latitude}
&longitude=${city.longitude}
&current=temperature_2m,weather_code,wind_speed_10m,apparent_temperature,relative_humidity_2m,precipitation
&hourly=temperature_2m,weather_code,precipitation_probability
&daily=temperature_2m_max,temperature_2m_min,weather_code
&timezone=auto${unitsQuery}`;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        setWeather(result);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setWeather(null);
        }
      } finally {
        setLoading(false);
      }
    },
    [unitsQuery],
  );

  useEffect(() => {
    if (!selectedCity) return;
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    fetchData(selectedCity, signal);

    return () => {
      controller.abort();
    };
  }, [selectedCity, fetchData]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationDenied(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const cityFromLocation: Result = {
          latitude,
          longitude,
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
        };

        setSelectedCity(cityFromLocation);
      },
      () => {
        setLocationDenied(true);
      },
    );
  }, []);

  let prettyDate = "";

  if (weather?.current?.time) {
    prettyDate = new Date(weather.current.time).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getWeatherIcon(code: number): string {
    if (code === 0) {
      return sunnyIcon;
    }
    if (code === 1) {
      return partlyCloudyIcon;
    }
    if (code === 2) {
      return partlyCloudyIcon;
    }
    if (code === 3) {
      return overCastIcon;
    }
    if (code === 45 || code === 48) {
      return fogIcon;
    }
    if (code >= 51 && code <= 57) {
      return drizzleIcon;
    }
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
      return rainIcon;
    }
    if (code >= 71 && code <= 77) {
      return snowIcon;
    }
    if (code >= 95 && code <= 99) {
      return stormIcon;
    }
    return partlyCloudyIcon;
  }

  const days: string[] = [];

  if (weather?.daily) {
    for (const date of weather.daily.time) {
      const dia = new Date(date);
      days.push(dia.toLocaleDateString("en-US", { weekday: "short" }));
    }
  }

  const hourlyData = useMemo(() => {
    if (!weather || !weather.hourly) return [];

    // 1. Convertimos el nombre del día (ej: "Monday") a una fecha comparable
    // O más fácil: buscamos en weather.daily.time cuál coincide con el día seleccionado
    const dayIndex = weather.daily.time.findIndex((dateStr) => {
      const dayName = new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
      });
      return dayName === selectedDay;
    });

    if (dayIndex === -1) return [];

    // 2. Cada día tiene 24 horas.
    // El día 0 (hoy) empieza en el índice 0, el día 1 en el 24, etc.
    const startIndex = dayIndex * 24;
    const endIndex = startIndex + 24;

    // 3. Creamos un array de objetos para que sea fácil de mapear en el JSX
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
    fetchData(selectedCity, controller.signal);
  };

  return (
    <div className="w-full min-h-dvh flex flex-col items-center bg-Neutral-900 lg:overflow-hidden">
      <div className="w-full max-w-274 px-4 pt-10 text-Neutral-200 flex flex-col flex-1">
        <Header units={units} handleSwitch={handleSwitch} />
        <main className="mt-16 flex flex-col flex-1 pb-10 md:overflow-hidden">
          {!error && (
            <h1 className="text-center text-5xl font-semibold font-dmsans">
              How's the sky looking today?
            </h1>
          )}

          {!error && <Form setSelectedCity={setSelectedCity} />}

          {loading && <SkeletonLoader />}
          {error && !locationDenied && <ErrorComponent onRetry={handleRetry} />}

          {locationDenied && !weather && !loading && (
            <p className="text-center text-Neutral-300 mt-6">
              Location access was denied. You can search for a city manually.
            </p>
          )}

          {weather && !loading && !error && (
            <div className="mt-10 lg:grid grid-cols-3 grid-rows-6 gap-5 flex-1 min-h-0">
              <section className="col-span-2 row-span-4 rounded-3xl font-dmsans">
                <div className="h-full w-full grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-5">
                  <header className="col-span-2 row-span-2 md:col-span-4 md:row-span-2 bg-[url(./assets/images/bg-today-large.svg)] bg-no-repeat bg-cover bg-center flex items-center md:justify-between justify-center flex-col md:flex-row px-5 rounded-2xl">
                    <div>
                      <h1 className="text-3xl font-bold text-center">
                        {selectedCity?.name}
                        {selectedCity?.country != "" && ", "}
                        {selectedCity?.country}
                      </h1>
                      <p className="font-medium text-center">{prettyDate}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        className="h-26 w-26"
                        src={getWeatherIcon(weather.current.weather_code)}
                        alt="weather icon"
                      />
                      <h1 className="text-7xl font-semibold italic">
                        {weather.current.temperature_2m}°
                      </h1>
                    </div>
                  </header>
                  <div className="row-start-3 flex items-center md:mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
                    <dl className="h-full flex flex-col items-start justify-between">
                      <dt className="font-medium text-Neutral-300">
                        Feels Like
                      </dt>
                      <dd className="text-2xl text-white">
                        {weather.current.apparent_temperature}°
                      </dd>
                    </dl>
                  </div>
                  <div className="row-start-3 flex items-center md:mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
                    <dl className="h-full flex flex-col items-start justify-between">
                      <dt className="font-medium text-Neutral-300">Humidity</dt>
                      <dd className="text-2xl text-white">
                        {weather.current.relative_humidity_2m}%
                      </dd>
                    </dl>
                  </div>
                  <div className="row-start-4 md:row-start-3 flex items-center md:mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
                    <dl className="h-full flex flex-col items-start justify-between">
                      <dt className="font-medium text-Neutral-300">Wind</dt>
                      <dd className="text-2xl text-white">
                        {weather.current.wind_speed_10m}
                        {units == "metric" ? " km/h" : " mph"}
                      </dd>
                    </dl>
                  </div>
                  <div className="row-start-4 md:row-start-3 flex items-center md:mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
                    <dl className="h-full flex flex-col items-start justify-between">
                      <dt className="font-medium text-Neutral-300">
                        Precipitation
                      </dt>
                      <dd className="text-2xl text-white">
                        {weather.current.precipitation}{" "}
                        {units == "metric" ? " mm" : " in"}
                      </dd>
                    </dl>
                  </div>
                </div>
              </section>

              <section className="col-span-2 row-span-2 row-start-5 col-start-1 rounded-3xl flex flex-col gap-3 pt-1 mt-3 md:mt-0 font-dmsans">
                <h3 className="font-bold">Daily forecast</h3>
                <ul className="grid grid-cols-3 md:flex gap-4 md:gap-2 h-full">
                  {weather.daily.time.map((time, index) => (
                    <li
                      key={time.toString()}
                      className="bg-Neutral-700 p-2.5 rounded-xl flex items-center justify-between flex-col w-full"
                    >
                      <p className="font-semibold">{days[index]} </p>
                      <img
                        className="h-10 w-10 my-4.5 md:my-0"
                        src={getWeatherIcon(weather.daily.weather_code[index])}
                        alt="Weather icon"
                      />
                      <div className="flex justify-between w-full text-sm font-semibold">
                        <p>
                          {Math.round(weather.daily.temperature_2m_max[index])}°
                        </p>
                        <p>
                          {Math.round(weather.daily.temperature_2m_min[index])}°
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <aside className="mt-5 lg:mt-0 row-span-6 col-start-3 row-start-1 rounded-3xl bg-Neutral-700 flex flex-col">
                <div className="flex justify-between px-5 pt-5">
                  <h3 className="font-semibold">Hourly forecast</h3>

                  <div className="relative">
                    <button
                      onClick={() => setActiveDaysMenu(!activeDaysMenu)}
                      className="flex items-center gap-3 bg-Neutral-600 px-3 py-1 rounded-md text-sm font-semibold hover:cursor-pointer"
                    >
                      {selectedDay}
                      <Dropdown />
                    </button>

                    {activeDaysMenu && (
                      <div className="absolute flex flex-col w-[200%] gap-2 top-full right-0 bg-Neutral-800 border border-Neutral-600 rounded-xl mt-2 p-1 z-10">
                        <button
                          onClick={() => {
                            setSelectedDay("Monday");
                            setActiveDaysMenu(false);
                          }}
                          className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                        >
                          Monday
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDay("Tuesday");
                            setActiveDaysMenu(false);
                          }}
                          className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                        >
                          Tuesday
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDay("Wednesday");
                            setActiveDaysMenu(false);
                          }}
                          className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                        >
                          Wednesday
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDay("Thursday");
                            setActiveDaysMenu(false);
                          }}
                          className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                        >
                          Thursday
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDay("Friday");
                            setActiveDaysMenu(false);
                          }}
                          className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                        >
                          Friday
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDay("Saturday");
                            setActiveDaysMenu(false);
                          }}
                          className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                        >
                          Saturday
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDay("Sunday");
                            setActiveDaysMenu(false);
                          }}
                          className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                        >
                          Sunday
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contenedor con scroll para las horas */}
                <div className="flex-1 min-h-0 mt-3 mb-3 md:mb-0">
                  <ul className="max-h-122.75 overflow-y-scroll custom-scrollbar flex flex-col gap-3">
                    {hourlyData.map((hour) => (
                      <li
                        key={hour.time}
                        className="flex items-center justify-between mx-4 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={getWeatherIcon(hour.code)}
                            className="w-10 h-10"
                          />
                          <span>
                            {new Date(hour.time).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              hour12: true,
                            })}
                          </span>
                        </div>

                        <span className="text-xl font-bold">
                          {Math.round(hour.temp)}°
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
