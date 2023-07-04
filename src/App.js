import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Map from './components/Map';
import AdSenseScript from "./g/AdSense";
import Footer from "./components/Footer";

// The App component with routing
function App() {
    const [position, setPosition] = useState(null);
    return (
        <Router>
            <Helmet>
                <title>MyStreet: Discover the History Behind Streets</title>
                <meta name="description" content="MyStreet is an interactive map application that reveals the history and significance of street names in Ukraine. Explore the stories behind the names and uncover the cultural heritage of your city streets." />
                <meta name="keywords" content="My Street, Street story, Street History, Ukraine, Map, Historical Significance, Cultural Heritage, Street Names, OpenAI, AI-Generated Stories" />
            </Helmet>
            <AdSenseScript />
            <Routes>
                <Route path="/" element={<Map position={position} setPosition={setPosition} />}/> {/* Use the Map component */}
                {
                    /* Other routes can be added here */
                }
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;