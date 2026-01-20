import { Dropdown } from "../icons/Dropdown";

export const SkeletonLoader = () => {
  return (
    <div className="mt-10 grid grid-cols-3 grid-rows-6 gap-5 flex-1 min-h-0">
      <section className="col-span-2 row-span-4 rounded-3xl font-dmsans">
        <div className="h-full w-full grid grid-cols-4 grid-rows-3 gap-5">
          <header className="col-span-4 bg-Neutral-700 row-span-2 flex items-center justify-center flex-col gap-1 px-5 rounded-2xl">
            <div className="loader"></div>
            <p className="font-medium   ">Loading...</p>
          </header>
          <div className="row-start-3 flex items-center mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
            <dl className="h-full flex flex-col items-start justify-between">
              <dt className="font-medium text-Neutral-300">Feels Like</dt>
              <dd className="text-2xl text-white">-</dd>
            </dl>
          </div>
          <div className="row-start-3 flex items-center mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
            <dl className="h-full flex flex-col items-start justify-between">
              <dt className="font-medium text-Neutral-300">Humidity</dt>
              <dd className="text-2xl text-white">-</dd>
            </dl>
          </div>
          <div className="row-start-3 flex items-center mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
            <dl className="h-full flex flex-col items-start justify-between">
              <dt className="font-medium text-Neutral-300">Wind</dt>
              <dd className="text-2xl text-white">-</dd>
            </dl>
          </div>
          <div className="row-start-3 flex items-center mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
            <dl className="h-full flex flex-col items-start justify-between">
              <dt className="font-medium text-Neutral-300">Precipitation</dt>
              <dd className="text-2xl text-white">-</dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="col-span-2 row-span-2 row-start-5 col-start-1 rounded-3xl flex flex-col gap-3 pt-1 font-dmsans">
        <h3 className="font-bold">Daily forecast</h3>
        <ul className="flex gap-2 h-full">
          <li className="bg-Neutral-700 p-2.5 rounded-xl w-full"></li>
          <li className="bg-Neutral-700 p-2.5 rounded-xl w-full"></li>
          <li className="bg-Neutral-700 p-2.5 rounded-xl w-full"></li>
          <li className="bg-Neutral-700 p-2.5 rounded-xl w-full"></li>
          <li className="bg-Neutral-700 p-2.5 rounded-xl w-full"></li>
          <li className="bg-Neutral-700 p-2.5 rounded-xl w-full"></li>
          <li className="bg-Neutral-700 p-2.5 rounded-xl w-full"></li>
        </ul>
      </section>

      <aside className="row-span-6 col-start-3 row-start-1 rounded-3xl bg-Neutral-700 flex flex-col">
        <div className="flex justify-between px-5 pt-5">
          <h3 className="font-semibold">Hourly forecast</h3>

          <div className="relative">
            <button className="flex items-center gap-3 bg-Neutral-600 px-3 py-1 rounded-md text-sm font-semibold hover:cursor-pointer">
              -
              <Dropdown />
            </button>
          </div>
        </div>

        {/* Contenedor con scroll para las horas */}
        <div className="flex-1 min-h-0 mt-3">
          <ul className="max-h-122.75 overflow-y-scroll custom-scrollbar flex flex-col gap-3">
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
            <li className="mx-4 py-5 bg-Neutral-600/50 p-2 rounded-xl border border-Neutral-600"></li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
