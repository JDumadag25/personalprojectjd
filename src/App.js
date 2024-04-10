import { useState } from 'react';

const data = {
    cars: [
        {
            make: 'Nissan',
            model: 'Sentra',
            year: '2023',
            color: 'Silver',
        },
        {
            make: 'Nissan',
            model: 'Rouge',
            year: '2020',
            color: 'Black',
        },
        {
            make: 'Lexus',
            model: 'IS 300',
            year: '2022',
            color: 'Blue',
        },
        {
            make: 'Honda',
            model: 'Accord',
            year: '2023',
            color: 'Silver',
        },
        {
            make: 'Toyota',
            model: 'Camry',
            year: '2000',
            color: 'White',
        },
    ],
};

function App() {
    const [cars, setCars] = useState(data.cars);

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold underline">Car Inventory</h1>
            </div>
            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <div style={{ flex: 1 }}>Make</div>
                    <div style={{ flex: 1 }}>Model</div>
                    <div style={{ flex: 1 }}>Year</div>
                    <div style={{ flex: 1 }}>Color</div>
                </div>
                {cars
                    .sort((a, b) => a.id - b.id)
                    .map((car, i) => {
                        return (
                            <div
                                key={`car-${i}`}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div style={{ flex: 1 }}>{car.make}</div>
                                <div style={{ flex: 1 }}>{car.model}</div>
                                <div style={{ flex: 1 }}>{car.year}</div>
                                <div style={{ flex: 1 }}>{car.color}</div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default App;
