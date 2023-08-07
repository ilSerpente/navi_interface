import mapboxgl from 'mapbox-gl';
import { useEffect, useState, useRef } from 'react';

mapboxgl.accessToken = 'pk.eyJ1Ijoib3BhbmluaSIsImEiOiJja3hubG01eDAwbzVjMnVyejVkM2VreWUzIn0.i3qq0iN9dwwVqPoMVYeK6g';

const point = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                'name': 'Rixo',
            },
            "geometry": {
                "coordinates": [
                    12.380929156882246,
                    43.28232393373651
                ],
                "type": "Point"
            }
        }
    ]
}

function trucksToGeojson(trucks) {
    let collection = {
        "type": "FeatureCollection",
        "features": []
    }

    for (let i = 0; i < trucks.length; i++) {
        let feature = {
            "type": "Feature",
            "properties": {
                'name': 'Rixo',
                'description': `<strong>${trucks[i].current_driver.raw.NAME1}</strong><p>Google maps: <a href="https://maps.google.com/?q=${trucks[i].lat},${trucks[i].lon}" target="_blank">${trucks[i].lat}, ${trucks[i].lon}</a></p>`

            },
            "geometry": {
                "coordinates": [
                    trucks[i].lon,
                    trucks[i].lat
                ],
                "type": "Point"
            }
        }
        collection.features.push(feature)
    }
    return collection;
}

export default function Map(props) {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(12.5307);
    const [lat, setLat] = useState(47.3213);
    const [zoom, setZoom] = useState(4.4);
    const [hover, setHover] = useState(false);
    const [geojson, setGeojson] = useState(point)
    const [isLoaded, setIsLoaded] = useState(false)
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    });

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        map.current.on('load', () => {
            setIsLoaded(true)
        })
        map.current.on('mouseenter', 'earthquakes-layer', (e) => {
            map.current.getCanvas().style.cursor = 'pointer';
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;


            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
            // console.log('A mouseenter event occurred on a visible portion of the water layer.');
            // setHover(true)
        });
        map.current.on('mouseleave', 'earthquakes-layer', () => {
            map.current.getCanvas().style.cursor = '';
            // popup.remove();
            // console.log('A mouseenter event occurred on a visible portion of the water layer.');
            // setHover(false)
        });
    });

    useEffect(() => {

        if (props.trucks.length > 0) {
            console.log(props.trucks, "DEFENCE")
            setGeojson(trucksToGeojson(props.trucks))
        }

        if (!map.current.isStyleLoaded()) return;

        if (!map.current.getSource('earthquakes')) {
            map.current.addSource('earthquakes', {
                type: 'geojson',
                data: geojson
            });
            map.current.addLayer({
                'id': 'earthquakes-layer',
                'type': 'circle',
                'source': 'earthquakes',
                'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 2,
                    'circle-color': 'red',
                    'circle-stroke-color': 'white'
                }
            });
        } else {
            map.current.getSource('earthquakes').setData(geojson);
            map.current.removeLayer('earthquakes-layer');
            map.current.addLayer({
                'id': 'earthquakes-layer',
                'type': 'circle',
                'source': 'earthquakes',
                'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 2,
                    'circle-color': 'red',
                    'circle-stroke-color': 'white'
                }
            });
        }
    }, [props, isLoaded]);
    return (
        <div>
            {/* <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
            <div ref={mapContainer} className="map-container" />
            {hover && <div>How</div>}
        </div>
    );
}