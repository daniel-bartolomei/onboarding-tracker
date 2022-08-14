import React from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router } from "react-router-dom";

import OnboardingTracker from './OnboardingTracker';

function App() {
    return (
        <div className="App">
            <Router>
                <OnboardingTracker />
            </Router>
        </div>
    );
}

export default App;
