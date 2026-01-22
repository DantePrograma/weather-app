import type { WeatherData } from "../hooks/useWeatherApi";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import type { Result } from "./Form";

interface TodaySectionProps {
  weather: WeatherData;
  selectedCity: Result | null;
  prettyDate: string;
  units: "metric" | "imperial";
}

export const TodaySection = ({
  weather,
  selectedCity,
  prettyDate,
  units,
}: TodaySectionProps) => {
  return (
    <section className="col-span-2 row-span-4 rounded-3xl font-dmsans">
      <div className="h-full w-full grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-5">
        <header className="col-span-2 row-span-2 md:col-span-4 md:row-span-2 bg-[url(./assets/images/bg-today-large.svg)] bg-no-repeat bg-cover bg-center flex items-center md:justify-between justify-center flex-col md:flex-row px-5 rounded-2xl">
          <div>
            <h1 className="text-3xl font-bold text-center md:text-left">
              {selectedCity?.name}
              {selectedCity?.country != "" && ", "}
              {selectedCity?.country}
            </h1>
            <p className="font-medium text-center md:text-left">{prettyDate}</p>
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
            <dt className="font-medium text-Neutral-300">Feels Like</dt>
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
            <dt className="font-medium text-Neutral-300">Precipitation</dt>
            <dd className="text-2xl text-white">
              {weather.current.precipitation}{" "}
              {units == "metric" ? " mm" : " in"}
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
};
