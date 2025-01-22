import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [units, setUnits] = useState(() => 
    localStorage.getItem('units') || 'metric'
  );
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    localStorage.setItem('units', units);
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [units, theme]);

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home units={units} />} />
            <Route 
              path="/settings" 
              element={
                <Settings 
                  units={units} 
                  setUnits={setUnits}
                  theme={theme}
                  setTheme={setTheme}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;