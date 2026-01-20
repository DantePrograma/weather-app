import { LoadingIcon } from "../icons/LoadingIcon";

export const SuggestionsLoader = () => {
  return (
    <div className="absolute flex items-center gap-2 top-full left-0 w-full bg-Neutral-800 rounded-md mt-2 p-3 z-10">
      <LoadingIcon />
      <span className="font-medium text-sm">Search in progress</span>
    </div>
  );
};
