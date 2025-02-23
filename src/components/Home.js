import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './Weathercard';
import SearchBar from './SearchBar';
import Forecast from './Forecast';



function Home({ units }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentLocations, setRecentLocations] = useState(() =>
    JSON.parse(localStorage.getItem('recentLocations')) || []
  );

  const fetchWeather = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${query}&days=7&aqi=yes`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const query = `${position.coords.latitude},${position.coords.longitude}`;
          fetchWeather(query);
        },
        () => {
          setError('Unable to get location. Please search manually.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  }, []);

  return (
    <div className="home">
      <SearchBar 
        onSearch={fetchWeather}
        recentLocations={recentLocations}
        setRecentLocations={setRecentLocations}
      />
      
      {loading && <div className="loading-spinner"></div>}
      {error && <div className="error">{error}</div>}
      
      {weather && !loading && (
        <>
          <WeatherCard weather={weather} units={units} />
          <Forecast forecast={weather.forecast} units={units} />
        </>
      )}
    </div>
  );
}

export default Home;