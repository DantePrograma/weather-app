import { useState } from "react";
import { Logo } from "../icons/Logo";
import { Settings } from "../icons/Settings";
import { Check } from "../icons/Check";

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [tempType, setTempType] = useState<"Celsius" | "Fahrenheit">("Celsius");
  const [windType, setWindType] = useState<"km/h" | "mph">("km/h");
  const [precipitationType, setPrecipitationType] = useState<"mm" | "in">("mm");
  const [currentSystem, setCurrentSystem] = useState<"metric" | "imperial">(
    "metric"
  );

  const handleSwitch = () => {
    if (currentSystem == "metric") {
      setPrecipitationType("in");
      setTempType("Fahrenheit");
      setWindType("mph");
      setCurrentSystem("imperial");
    } else {
      setPrecipitationType("mm");
      setTempType("Celsius");
      setWindType("km/h");
      setCurrentSystem("metric");
    }
  };

  return (
    <header className="flex justify-between items-center w-full">
      <Logo />

      <div className="relative">
        <button
          onClick={() => setActiveMenu(!activeMenu)}
          className="flex items-center gap-2 px-3 py-2 bg-Neutral-700 rounded-md"
        >
          <Settings />
          <p className="text-center font-grotesque font-medium text-sm">
            Units
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="8"
            fill="none"
            viewBox="0 0 13 8"
          >
            <path
              fill="#fff"
              d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0"
            />
          </svg>
        </button>

        {/* dropdown menu */}
        {activeMenu && (
          <div className="absolute right-0 mt-2 px-2 py-3 rounded-xl bg-Neutral-700 min-w-50 border border-Neutral-600 transition">
            <button
              onClick={() => handleSwitch()}
              className="w-full text-left rounded-md p-2 font-semibold text-sm font-dmsans transition hover:bg-Neutral-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {currentSystem == "metric"
                ? "Switch to Imperial"
                : "Switch to Metric"}
            </button>

            <fieldset className="mt-3 pb-1 flex flex-col border-b border-b-Neutral-600">
              <legend className="text-[#a1a1a1] pl-2 text-xs font-medium font-dmsans mb-2">
                Temperature
              </legend>
              <button
                onClick={() => setTempType("Celsius")}
                className={`${
                  tempType == "Celsius" && "bg-Neutral-600"
                } w-full py-1.5 px-2 rounded-md font-semibold transition flex justify-between items-center`}
              >
                Celsius (°C)
                {tempType == "Celsius" && <Check />}
              </button>
              <button
                onClick={() => setTempType("Fahrenheit")}
                className={`${
                  tempType == "Fahrenheit" && "bg-Neutral-600"
                } w-full py-1.5 px-2 rounded-md font-semibold transition flex justify-between items-center`}
              >
                Fahrenheit (°F)
                {tempType == "Fahrenheit" && <Check />}
              </button>
            </fieldset>

            <fieldset className="mt-3 pb-1 flex flex-col border-b border-b-Neutral-600 ">
              <legend className="text-[#a1a1a1] pl-2 text-xs font-medium font-dmsans mb-2">
                Wind Speed
              </legend>
              <button
                onClick={() => setWindType("km/h")}
                className={`${
                  windType == "km/h" && "bg-Neutral-600"
                } w-full py-1.5 px-2 rounded-md font-semibold transition flex justify-between items-center`}
              >
                km/h
                {windType == "km/h" && <Check />}
              </button>
              <button
                onClick={() => setWindType("mph")}
                className={`${
                  windType == "mph" && "bg-Neutral-600"
                } w-full py-1.5 px-2 rounded-md font-semibold transition flex justify-between items-center`}
              >
                mph
                {windType == "mph" && <Check />}
              </button>
            </fieldset>

            <fieldset className="mt-3 flex flex-col">
              <legend className="text-[#a1a1a1] pl-2 text-xs font-medium font-dmsans mb-2">
                Precipitation
              </legend>
              <button
                onClick={() => setPrecipitationType("mm")}
                className={`${
                  precipitationType == "mm" && "bg-Neutral-600"
                } w-full py-1.5 px-2 rounded-md font-semibold transition flex justify-between items-center`}
              >
                Millimeters (mm)
                {precipitationType == "mm" && <Check />}
              </button>
              <button
                onClick={() => setPrecipitationType("in")}
                className={`${
                  precipitationType == "in" && "bg-Neutral-600"
                } w-full py-1.5 px-2 rounded-md font-semibold transition flex justify-between items-center`}
              >
                Inches (in)
                {precipitationType == "in" && <Check />}
              </button>
            </fieldset>
          </div>
        )}
      </div>
    </header>
  );
};
