import * as React from 'react';
import { useEffect, useState } from 'react';
import Map from './map/Map'
import ListOfTrucks from './sidebar/Sidebar';


export default function Page() {
    const [trucksRaw, setTrucksRaw] = useState([]);

    const updateState = async () => {

        const request = await fetch('http://127.0.0.1:5000/number')
        let trucksJson = await request.json()

        setTrucksRaw(trucksJson.list)
    }

    useEffect(() => {
        updateState();
    }, []);
    return (
        <div>
            <Map trucks={trucksRaw} />
            <ListOfTrucks trucks={trucksRaw} />
        </div>
    );
}




