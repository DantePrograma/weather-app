import { useEffect, useRef, useState } from "react";
import { Search } from "../icons/Search";
import { useDebounce } from "../hooks/useDebounce";
import { SuggestionsLoader } from "./SuggestionsLoader";

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

type FormProps = {
  setSelectedCity: (result: Result) => void;
};

export const Form = ({ setSelectedCity }: FormProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [pickedCity, setPickedCity] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPickedCity(null);
  };

  const selectQuery = (result: Result) => {
    setPickedCity(result);
    setQuery(`${result.name}, ${result.country}`);
    setSuggestions(null);
    inputRef.current?.blur();
  };

  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    if (pickedCity) return;
    if (debouncedQuery.length < 3) return;

    const fetchData = async () => {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedQuery}&count=5&language=es`;
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        setSuggestions({
          ...result,
          results: result.results ?? [],
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setSuggestions(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, pickedCity]);

  const showSuggestions = debouncedQuery.length >= 3 && suggestions;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickedCity) return;
    setSelectedCity(pickedCity);
    buttonRef.current?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className="grid place-items-center mt-16">
      <div className="w-full max-w-136 flex gap-3">
        <div className="relative flex-1">
          <label
            className="w-full focus:ring-2 ring-Blue-500 bg-Neutral-800 p-2 rounded-lg flex items-center gap-2 pl-4 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-Neutral-900 cursor-pointer"
            htmlFor="search-bar"
          >
            <Search />
            <input
              ref={inputRef}
              value={query}
              onChange={handleChange}
              placeholder="Search for a place..."
              id="search-bar"
              className="focus:outline-0 py-0.5 w-full font-dmsans placeholder:text-Neutral-300 placeholder:text-medium"
              type="text"
            />
          </label>
          {/* preview de los resultados */}
          {loading && <SuggestionsLoader />}
          {error && !loading && <div>Error</div>}
          {showSuggestions && !loading && !error && (
            <div className="absolute flex flex-col gap-2 top-full left-0 w-full bg-Neutral-800 rounded-xl mt-2 p-1 z-10">
              {suggestions?.results && suggestions.results.length > 0 ? (
                suggestions.results.map((suggestion) => (
                  <button
                    type="button"
                    onClick={() => selectQuery(suggestion)}
                    className="p-1 text-left hover:bg-Neutral-700 hover:border-Neutral-600 border border-Neutral-800 transition rounded-lg focus:outline-none focus:ring-2 focus:ring-Blue-500"
                    key={suggestion.id}
                  >
                    <p className="pl-1 font-dmsans text-Neutral-300">
                      {suggestion.name}, {suggestion.country}
                    </p>
                  </button>
                ))
              ) : (
                <div className="p-2 text-sm text-Neutral-400">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>
        <button
          ref={buttonRef}
          className="bg-Blue-500 py-2 px-4 rounded-lg font-dmsans font-semibold text-neutral-200 focus:outline-none focus:ring-2 focus:ring-Blue-500 focus:ring-offset-2 focus:ring-offset-[#0b1020]"
        >
          Search
        </button>
      </div>
    </form>
  );
};
