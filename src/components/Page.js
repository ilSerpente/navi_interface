import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Map from './map/Map'
import ListOfTrucks from './sidebar/Sidebar';


export default function Page() {
    const [trucksRaw, setTrucksRaw] = useState({});
    const timestamp = useRef(0)

    const updateState = async () => {

        const request = await fetch(`http://127.0.0.1:5000/number/${timestamp.current}`)
        let trucksJson = await request.json()
        timestamp.current = trucksJson.timestamp;

        if (Object.keys(trucksRaw).length === 0) {
            setTrucksRaw(trucksJson)
        } else {
            const updatedTrucksRaw = {
                ...trucksRaw,
                ...trucksJson,
              };
            setTrucksRaw(updatedTrucksRaw);
        }
    };

    useEffect(() => {
        updateState();
    }, []);

    useEffect(() => {
        const intervalCall = setInterval(() => {
            updateState();
            console.log("React interval")
        }, 10000);
        return () => {
            clearInterval(intervalCall);
        };
    }, []);
    return (
        <div>
            <Map trucks={ trucksRaw } />
            <ListOfTrucks trucks={ trucksRaw } />
        </div>
    );
}




