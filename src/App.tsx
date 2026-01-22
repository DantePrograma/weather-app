import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { useEffect } from "react";
import { ErrorComponent } from "./components/Error";
import { SkeletonLoader } from "./components/SkeletonLoader";
import { useWeather } from "./hooks/useWeather";
import { useGeolocation } from "./hooks/useGeolocation";
import { TodaySection } from "./components/TodaySection";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";

function App() {
  const { locationDenied, location } = useGeolocation();
  const {
    weather,
    loading,
    error,
    units,
    handleSwitch,
    selectedCity,
    selectedDay,
    setSelectedCity,
    setSelectedDay,
    prettyDate,
    handleRetry,
    hourlyData,
    days,
  } = useWeather();

  useEffect(() => {
    if (location && !selectedCity) {
      setSelectedCity(location);
    }
  }, [location, selectedCity, setSelectedCity]);

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
              <TodaySection
                weather={weather}
                selectedCity={selectedCity}
                prettyDate={prettyDate}
                units={units}
              />

              <DailyForecast weather={weather} days={days} />

              <HourlyForecast
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                hourlyData={hourlyData}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
