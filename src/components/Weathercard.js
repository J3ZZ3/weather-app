import { UilTemperature, UilTear, UilWind } from '@iconscout/react-unicons';
import './styles/WeatherCard.css';

function WeatherCard({ weather, units }) {
  const current = weather.current;
  const location = weather.location;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{location.name}</h2>
          <p>{location.region}, {location.country}</p>
        </div>
        <img 
          src={current.condition.icon} 
          alt={current.condition.text}
          className="weather-icon"
        />
      </div>

      <div className="weather-info">
        <div className="main-temp">
          <UilTemperature size={20} />
          <span className="temperature">
            {units === 'metric' ? current.temp_c : current.temp_f}°
            {units === 'metric' ? 'C' : 'F'}
          </span>
        </div>

        <div className="weather-details">
          <div className="detail">
            <UilTear size={18} />
            <span>Humidity: {current.humidity}%</span>
          </div>
          <div className="detail">
            <UilWind size={18} />
            <span>
              Wind: {units === 'metric' ? current.wind_kph : current.wind_mph}
              {units === 'metric' ? ' km/h' : ' mph'}
            </span>
          </div>
        </div>

        <p className="condition">{current.condition.text}</p>
      </div>
    </div>
  );
}

export default WeatherCard;