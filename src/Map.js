import styles from './Map.module.css';
import React, {useState} from "react";
import {MapContainer, Popup, TileLayer, useMapEvents} from "react-leaflet";
import axios from "axios";

function Map() {
    const [position, setPosition] = useState(null);
    const [road, setRoad] = useState(null);
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(false);

    function MapEvents() {
        const map = useMapEvents({
            click: async (e) => {
                setPosition(e.latlng);
                setLoading(true);  // start loading

                // Reverse Geocoding with Nominatim
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/v1/street/story?lat=${e.latlng.lat}&lng=${e.latlng.lng}`
                );

                setRoad(response.data.city + ", " + response.data.street);
                setStory(response.data.story);

                setLoading(false);  // stop loading
            },
        });

        return null;
    }

    return (
        <MapContainer center={[50.4501, 30.5234]} zoom={13} style={{ width: '100%', height: '100vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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