import { useState, useEffect } from 'react';
import { 
  UilTemperature, 
  UilTear, 
  UilWind
} from '@iconscout/react-unicons';
import './styles/Forecast.css';

function Forecast({ forecast, units }) {
  const [view, setView] = useState('hourly');
  const [alert, setAlert] = useState(null);

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  const formatDay = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  useEffect(() => {
    if (forecast && forecast.alerts && forecast.alerts.length > 0) {
      setAlert(forecast.alerts[0].description);
    } else {
      setAlert(null);
    }
  }, [forecast]);

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <h2>Forecast</h2>
        <div className="forecast-toggle">
          <button 
            className={`toggle-button ${view === 'hourly' ? 'active' : ''}`}
            onClick={() => setView('hourly')}
          >
            Hourly
          </button>
          <button 
            className={`toggle-button ${view === 'weekly' ? 'active' : ''}`}
            onClick={() => setView('weekly')}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="forecast-content">
        {view === 'hourly' ? (
          <div className="hourly-forecast">
            {forecast.forecastday[0].hour.map((hour, index) => (
              <div key={index} className="forecast-card">
                <div className="forecast-time">
                  {formatTime(hour.time)}
                </div>
                <img 
                  src={hour.condition.icon} 
                  alt={hour.condition.text}
                  className="weather-icon"
                />
                <div className="forecast-details">
                  <div className="forecast-temp">
                    <UilTemperature />
                    <span>
                      {Math.round(units === 'metric' ? hour.temp_c : hour.temp_f)}°
                      {units === 'metric' ? 'C' : 'F'}
                    </span>
                  </div>
                  <div className="forecast-info">
                    <div className="info-item">
                      <UilTear />
                      <span>{hour.humidity}%</span>
                    </div>
                    <div className="info-item">
                      <UilWind />
                      <span>
                        {Math.round(units === 'metric' ? hour.wind_kph : hour.wind_mph)}
                        {units === 'metric' ? ' km/h' : ' mph'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="weekly-forecast">
            {forecast.forecastday.map((day, index) => (
              <div key={index} className="forecast-card">
                <div className="forecast-date">
                  {formatDay(day.date)}
                </div>
                <img 
                  src={day.day.condition.icon} 
                  alt={day.day.condition.text}
                  className="weather-icon"
                />
                <div className="forecast-details">
                  <div className="temp-range">
                    <span className="max-temp">
                      {Math.round(units === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f)}°
                    </span>
                    <span className="min-temp">
                      {Math.round(units === 'metric' ? day.day.mintemp_c : day.day.mintemp_f)}°
                    </span>
                  </div>
                  <div className="forecast-info">
                    <div className="info-item">
                      <UilTear />
                      <span>{day.day.avghumidity}%</span>
                    </div>
                    <div className="info-item">
                      <UilWind />
                      <span>
                        {Math.round(units === 'metric' ? day.day.maxwind_kph : day.day.maxwind_mph)}
                        {units === 'metric' ? ' km/h' : ' mph'}
                      </span>
                    </div>
                  </div>
                  <div className="condition-text">
                    {day.day.condition.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {alert && <div className="alert">{alert}</div>}
      </div>
    </div>
  );
}

export default Forecast;