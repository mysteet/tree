import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './Map'; // Import the Map component

// The App component with routing
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Map />}/> {/* Use the Map component */}
                {/* Other routes can be added here */}
            </Routes>
        </Router>
    );
}

export default App;