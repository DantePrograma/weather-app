import { Form } from "./components/Form";
import { Header } from "./components/Header";
import sunnyIcon from "./assets/images/icon-sunny.webp";

// max-310

function App() {
  return (
    <div className="w-full h-dvh flex flex-col items-center bg-Neutral-900 overflow-hidden">
      <div className="w-full max-w-274 px-4 pt-10 text-Neutral-200 flex flex-col flex-1">
        <Header />
        <main className="mt-16 flex flex-col flex-1 pb-10">
          <h1 className="text-center text-5xl font-semibold font-dmsans">
            How's the sky looking today?
          </h1>

          <Form />

          <div className="mt-10 grid grid-cols-3 grid-rows-6 gap-5 flex-1 min-h-0">
            <section className="col-span-2 row-span-4 rounded-3xl font-dmsans">
              <div className="h-full w-full grid grid-cols-4 grid-rows-3 gap-5">
                <header className="col-span-4 row-span-2 bg-[url(./assets/images/bg-today-large.svg)] bg-no-repeat bg-cover bg-center flex items-center justify-between px-5 rounded-2xl">
                  <div>
                    <h1 className="text-3xl font-bold">Berlin, Germany</h1>
                    <p className="font-medium">Tuesday, Aug 5, 2025</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className="h-26 w-26"
                      src={sunnyIcon}
                      alt="weather icon"
                    />
                    <h1 className="text-7xl font-semibold italic">20°</h1>
                  </div>
                </header>
                <div className="row-start-3 flex items-center mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
                  <dl className="h-full flex flex-col items-start justify-between">
                    <dt className="font-medium text-Neutral-300">Feels Like</dt>
                    <dd className="text-2xl text-white">18°</dd>
                  </dl>
                </div>
                <div className="row-start-3 flex items-center mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
                  <dl className="h-full flex flex-col items-start justify-between">
                    <dt className="font-medium text-Neutral-300">Humidity</dt>
                    <dd className="text-2xl text-white">45%</dd>
                  </dl>
                </div>
                <div className="row-start-3 flex items-center mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
                  <dl className="h-full flex flex-col items-start justify-between">
                    <dt className="font-medium text-Neutral-300">Wind</dt>
                    <dd className="text-2xl text-white">45 km/h</dd>
                  </dl>
                </div>
                <div className="row-start-3 flex items-center mb-2 p-5 bg-Neutral-700 border-2 border-Neutral-600 rounded-xl">
                  <dl className="h-full flex flex-col items-start justify-between">
                    <dt className="font-medium text-Neutral-300">
                      Precipitation
                    </dt>
                    <dd className="text-2xl text-white">0 mm</dd>
                  </dl>
                </div>
              </div>
            </section>

            <section className="col-span-2 row-span-2 row-start-5 col-start-1 bg-white rounded-3xl"></section>

            <aside className="row-span-6 col-start-3 row-start-1 bg-blue-400 rounded-3xl"></aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
