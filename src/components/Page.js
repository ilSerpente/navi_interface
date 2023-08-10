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
        let newTrucksRaw = {};

        for (const [key, value] of Object.entries(trucksJson.list)) {
            newTrucksRaw[key] = {
                NAME1: value.NAME1,
                NAME2: value.NAME2,
                lat: value.lat,
                lon: value.lon,
                truck_id: value.truck_id,
            }
        }

        for (const [key, value] of Object.entries(trucksRaw)) {
            newTrucksRaw[key] = {
                NAME1: value.NAME1,
                NAME2: value.NAME2,
                lat: value.lat,
                lon: value.lon,
                truck_id: value.truck_id,
            }
        }
        setTrucksRaw(newTrucksRaw);
    };


    useEffect(() => {
        updateState();
    }, []);

    useEffect(() => {
        const intervalCall = setInterval(() => {
            updateState();
            console.log("React interval")
        }, 5000);
        return () => {
            clearInterval(intervalCall);
        };
    }, [trucksRaw]);
    
    return (
        <div>
            <Map trucks={trucksRaw} />
            <ListOfTrucks trucks={trucksRaw} />
        </div>
    );
}




