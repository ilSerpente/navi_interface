import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Map from './map/Map'
import ListOfTrucks from './sidebar/Sidebar';


export default function Page() {
    const [trucksRaw, setTrucksRaw] = useState({});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
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
                // displayed: true,
            }
        }
    
        for (const [key, value] of Object.entries(trucksRaw)) {

            if (key in newTrucksRaw) {
                newTrucksRaw[key] = {
                    NAME1: trucksJson.list[key].NAME1,
                    NAME2: trucksJson.list[key].NAME2,
                    lat: trucksJson.list[key].lat,
                    lon: trucksJson.list[key].lon,
                    truck_id: trucksJson.list[key].truck_id,
                    // displayed: newTrucksRaw[key].displayed,
                }

            } else {
                newTrucksRaw[key] = {
                    NAME1: value.NAME1,
                    NAME2: value.NAME2,
                    lat: value.lat,
                    lon: value.lon,
                    truck_id: value.truck_id,
                    // displayed: true,
                }
            }
        }
        setTrucksRaw(newTrucksRaw);
    };
    // console.log(Object.keys(trucksRaw))
    // const smth = Object.keys(trucksRaw).filter(key => trucksRaw[key].displayed == true)
    // console.log(smth)
    // for (const [key, value] of Object.entries(trucksRaw)){
    //     if (value.NAME1.search("64688") != -1){
    //         console.log(key)
    //     }
    // }

    function handleRowSelectionChange(newSelectionModel) {
        setRowSelectionModel(newSelectionModel)
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
                <Map trucks={trucksRaw} rowSelectionModel={rowSelectionModel}/>
                <ListOfTrucks trucks={trucksRaw} rowSelectionModel={rowSelectionModel} onRowSelectionModelChange={handleRowSelectionChange} />
            </div>
        );
    }




