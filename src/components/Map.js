import React, {useEffect, useState} from 'react';
import {MapContainer, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import axios from 'axios';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import styles from './Map.module.css';

function Map() {
    const [position, setPosition] = useState(null);
    const [road, setRoad] = useState(null);
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(false);

    function MapEvents() {
        const map = useMapEvents({
            click: async (e) => {
                setPosition(e.latlng);
                setLoading(true);

                try {
                    const response = await axios.get(
                        `${window.ROOTS_URL}/v1/street/story?lat=${e.latlng.lat}&lng=${e.latlng.lng}`
                    );
                    setRoad(response.data.city + ', ' + response.data.street);
                    setStory(response.data.story);
                } catch (error) {
                    console.error('Failed to fetch story:', error);
                }

                setLoading(false);
            },
        });

        useEffect(() => {
            const provider = new OpenStreetMapProvider();

            const searchControl = new GeoSearchControl({
                provider,
            });

            map.addControl(searchControl);

            return () => map.removeControl(searchControl);
        }, []);

        return null;
    }

    return (
        <MapContainer center={[50.4501, 30.5234]} zoom={13} style={{ width: '100%', height: '100vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
            />
            <MapEvents />
            {position && (
                <Popup position={position} className={styles['my-popup']}>
                    <div>
                        {loading ? (
                            <div className={styles.spinner}></div>
                        ) : (
                            <>
                                <h2>{road}</h2>
                                <p>{story}</p>
                            </>
                        )}
                    </div>
                </Popup>
            )}
        </MapContainer>
    );
}

export default Map;
