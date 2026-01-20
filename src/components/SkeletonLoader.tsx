import { Dropdown } from "../icons/Dropdown";

export const SkeletonLoader = () => {
  return (
    <div className="mt-10 lg:grid grid-cols-3 grid-rows-6 gap-5 flex-1 min-h-0">
      {/* MAIN CARD */}
      <section className="col-span-2 row-span-4 rounded-3xl font-dmsans">
        <div className="h-full w-full grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-5">
          {/* HEADER */}
          <header className="col-span-2 row-span-2 md:col-span-4 md:row-span-2 bg-Neutral-700 flex items-center justify-center flex-col gap-2 px-5 rounded-2xl">
            <div className="loader" />
            <p className="text-Neutral-300">Loading...</p>
          </header>

          {/* STATS */}
          {["Feels Like", "Humidity", "Wind", "Precipitation"].map(
            (label, i) => (
              <div
                key={label}
                className={`flex items-center p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl ${
                  i >= 2 ? "row-start-4 md:row-start-3" : "row-start-3"
                }`}
              >
                <dl className="h-full flex flex-col items-start justify-between w-full">
                  <dt className="font-medium text-Neutral-300">{label}</dt>
                  <dd className="h-6 w-16 bg-Neutral-600 rounded-md animate-pulse" />
                </dl>
              </div>
            ),
          )}
        </div>
      </section>

      {/* DAILY */}
      <section className="col-span-2 row-span-2 row-start-5 col-start-1 rounded-3xl flex flex-col gap-3 pt-1 mt-3 md:mt-0 font-dmsans">
        <h3 className="font-bold">Daily forecast</h3>
        <ul className="grid grid-cols-3 md:flex gap-4 md:gap-2 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="bg-Neutral-700 p-2.5 rounded-xl flex-1 animate-pulse"
            />
          ))}
        </ul>
      </section>

      {/* ASIDE */}
      <aside className="mt-5 lg:mt-0 row-span-6 col-start-3 row-start-1 rounded-3xl bg-Neutral-700 flex flex-col">
        <div className="flex justify-between px-5 pt-5">
          <h3 className="font-semibold">Hourly forecast</h3>
          <button className="flex items-center gap-3 bg-Neutral-600 px-3 py-1 rounded-md text-sm font-semibold">
            -
            <Dropdown />
          </button>
        </div>

        <div className="flex-1 min-h-0 mt-3 mb-3">
          <ul className="max-h-122.75 overflow-y-scroll custom-scrollbar flex flex-col gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <li
                key={i}
                className="mx-4 h-14 bg-Neutral-600/50 rounded-xl border border-Neutral-600 animate-pulse"
              />
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};
