import { useState } from 'react';
import * as uuid from 'uuid';
const data = {
    cars: [
        {
            id: 1,
            make: 'Nissan',
            model: 'Sentra',
            year: '2023',
            color: 'Silver',
        },
        {
            id: 2,
            make: 'Nissan',
            model: 'Rouge',
            year: '2020',
            color: 'Black',
        },
        {
            id: 3,
            make: 'Lexus',
            model: 'IS 300',
            year: '2022',
            color: 'Blue',
        },
        {
            id: 4,
            make: 'Honda',
            model: 'Accord',
            year: '2023',
            color: 'Silver',
        },
        {
            id: 5,
            make: 'Toyota',
            model: 'Camry',
            year: '2000',
            color: 'White',
        },
    ],
};

function App() {
    const [cars, setCars] = useState(data.cars);
    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCar, setCurrentCar] = useState(-1);

    const handleChange = (e) => {
        const results = cars.filter((car) => {
            if (e.target.value === '') return cars;
            return (
                car.make.toLowerCase().includes(e.target.value.toLowerCase()) ||
                car.model
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                car.color
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                car.year.includes(e.target.value)
            );
        });
        setQuery(e.target.value);
        setFilteredList(results);
    };

    const editCar = (i) => {
        setCurrentCar(i);
        setShowModal(true);
    };

    const addCar = (i) => {
        setCurrentCar(-1);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cars[currentCar]);
        if (cars[currentCar]) {
            setCars(
                cars.map((car) => {
                    return car.id === cars[currentCar].id
                        ? {
                              id: cars[currentCar].id,
                              make: e.target[0].value,
                              model: e.target[1].value,
                              year: e.target[2].value,
                              color: e.target[3].value,
                          }
                        : car;
                })
            );
        } else {
            setCars([
                ...cars,
                {
                    id: uuid.v4(),
                    make: e.target[0].value,
                    model: e.target[1].value,
                    year: e.target[2].value,
                    color: e.target[3].value,
                },
            ]);
        }

        setShowModal(false);
    };

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold underline">Car Inventory</h1>
            </div>
            <div>
                <div>
                    <form>
                        <div class="my-6 w-60">
                            <input
                                type="search"
                                value={query}
                                onChange={handleChange}
                                id="make"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Search"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div className="flex flex-row border-black border-2">
                    <div className="flex-1">Make</div>
                    <div className="flex-1">Model</div>
                    <div className="flex-1">Year</div>
                    <div className="flex-1">Color</div>
                </div>
                {query === ''
                    ? cars
                          .sort((a, b) => a.id - b.id)
                          .map((car, i) => {
                              return (
                                  <div
                                      key={`car-${i}`}
                                      className="flex flex-row my-2 "
                                      onClick={() => editCar(i)}
                                  >
                                      <div className="flex-1 ">{car.make}</div>
                                      <div className="flex-1 ">{car.model}</div>
                                      <div className="flex-1 ">{car.year}</div>
                                      <div className="flex-1 ">{car.color}</div>
                                  </div>
                              );
                          })
                    : filteredList
                          .sort((a, b) => a.id - b.id)
                          .map((car, i) => {
                              return (
                                  <div
                                      key={`car-${i}`}
                                      className="flex flex-row my-2 "
                                  >
                                      <div className="flex-1 ">{car.make}</div>
                                      <div className="flex-1 ">{car.model}</div>
                                      <div className="flex-1 ">{car.year}</div>
                                      <div className="flex-1 ">{car.color}</div>
                                  </div>
                              );
                          })}
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => addCar()}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add
                </button>
            </div>
            {showModal ? (
                <>
                    <div className="justify-center flex-1 fixed inset-0 z-50">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add New Car
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <div class="mb-6">
                                            <label
                                                for="make"
                                                class="block mb-2 text-sm font-medium text-gray-900 "
                                            >
                                                Make
                                            </label>
                                            <input
                                                type="text"
                                                id="make"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                defaultValue={
                                                    (cars[currentCar] || {})
                                                        .make
                                                }
                                                required
                                            />
                                        </div>
                                        <div class="mb-6">
                                            <label
                                                for="model"
                                                class="block mb-2 text-sm font-medium text-gray-900 "
                                            >
                                                Model
                                            </label>
                                            <input
                                                type="text"
                                                id="model"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                defaultValue={
                                                    (cars[currentCar] || {})
                                                        .model
                                                }
                                                required
                                            />
                                        </div>
                                        <div class="mb-6">
                                            <label
                                                for="year"
                                                class="block mb-2 text-sm font-medium text-gray-900 "
                                            >
                                                Year
                                            </label>
                                            <input
                                                type="text"
                                                id="year"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                defaultValue={
                                                    (cars[currentCar] || {})
                                                        .year
                                                }
                                                required
                                            />
                                        </div>
                                        <div class="mb-6">
                                            <label
                                                for="color"
                                                class="block mb-2 text-sm font-medium text-gray-900 "
                                            >
                                                Color
                                            </label>
                                            <input
                                                type="text"
                                                id="color"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                defaultValue={
                                                    (cars[currentCar] || {})
                                                        .color
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/*footer*/}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default App;
