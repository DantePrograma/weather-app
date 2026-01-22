import { useState } from "react";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { Dropdown } from "../icons/Dropdown";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type HourlyData = {
  time: string;
  temp: number;
  code: number;
};

type HourlyForecastProps = {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  hourlyData: HourlyData[];
};

export const HourlyForecast = ({
  selectedDay,
  setSelectedDay,
  hourlyData,
}: HourlyForecastProps) => {
  const [activeDaysMenu, setActiveDaysMenu] = useState(false);

  return (
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
              {weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setActiveDaysMenu(false);
                  }}
                  className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                >
                  {day}
                </button>
              ))}
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
                <img src={getWeatherIcon(hour.code)} className="w-10 h-10" />
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
  );
};
