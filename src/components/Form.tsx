import { useEffect, useRef, useState } from "react";
import { Search } from "../icons/Search";
import { useDebounce } from "../hooks/useDebounce";

export interface Suggestions {
  results: Result[];
  generationtime_ms: number;
}

export interface Result {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id?: number;
  admin3_id?: number;
  timezone: string;
  population?: number;
  postcodes?: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
  admin3?: string;
}

export const Form = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);

  //state for see if the user have selected a city
  const isSelectingRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const selectQuery = (result: Result) => {
    isSelectingRef.current = true;
    setQuery(`${result.name}, ${result.country}`);
    setSuggestions(null);
  };

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }
    if (debouncedQuery.length < 3) return;

    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedQuery}&count=5&language=es`
    )
      .then((res) => res.json())
      .then((data: Suggestions) => {
        setSuggestions(data.results ? data : null);
      });
  }, [debouncedQuery]);

  const showSuggestions = debouncedQuery.length >= 3 && suggestions;

  return (
    <form action="" className="grid place-items-center mt-16">
      <div className="w-full max-w-135 flex gap-3">
        <label
          className="w-full focus:ring-2 ring-Blue-500 relative bg-Neutral-800 p-2 rounded-lg flex items-center gap-2 pl-4 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-Neutral-900 cursor-pointer"
          htmlFor="search-bar"
        >
          <Search />
          <input
            value={query}
            onChange={handleChange}
            placeholder="Search for a place..."
            id="search-bar"
            className="focus:outline-0 py-0.5 w-full font-dmsans placeholder:text-Neutral-300 placeholder:text-medium"
            type="text"
          />

          {/* preview de los resultados */}

          {showSuggestions && (
            <div className="absolute flex flex-col gap-2 top-full left-0 w-full bg-Neutral-800 rounded-md mt-2 p-1 z-10">
              {suggestions.results.map((suggestion) => (
                <button
                  onClick={() => selectQuery(suggestion)}
                  className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                  key={suggestion.id}
                >
                  <p className="pl-1 font-dmsans text-Neutral-300">
                    {suggestion.name}, {suggestion.country}
                  </p>
                </button>
              ))}
            </div>
          )}
        </label>

        <button className="bg-Blue-500 py-2 px-4 rounded-lg font-dmsans font-semibold text-neutral-200 focus:outline-none focus:ring-2 focus:ring-Blue-500 focus:ring-offset-2 focus:ring-offset-[#0b1020]">
          Search
        </button>
      </div>
    </form>
  );
};
