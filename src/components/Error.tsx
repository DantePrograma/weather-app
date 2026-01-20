import { Blocked } from "../icons/Blocked";
import { Retry } from "../icons/Retry";

type Props = {
  onRetry: () => void;
};

export const ErrorComponent = ({ onRetry }: Props) => {
  return (
    <div className="w-full max-w-124 mx-auto font-dmsans flex flex-col items-center gap-5 mt-5">
      <Blocked />
      <h1 className="text-5xl font-semibold text-white">
        Something went wrong
      </h1>
      <p className="px-6 text-center font-medium text-Neutral-300">
        We couldn't connect to the server(API error). Please try again in a few
        moments.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 font-medium py-1 px-3 bg-Neutral-700 rounded-md"
      >
        <Retry /> Retry
      </button>
    </div>
  );
};
