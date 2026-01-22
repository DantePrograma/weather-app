import type { WeatherData } from "../hooks/useWeatherApi";
import { getWeatherIcon } from "../utils/getWeatherIcon";

type DailyForecastProps = {
  weather: WeatherData;
  days: string[];
};

export const DailyForecast = ({ weather, days }: DailyForecastProps) => {
  return (
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
              <p>{Math.round(weather.daily.temperature_2m_max[index])}°</p>
              <p>{Math.round(weather.daily.temperature_2m_min[index])}°</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
