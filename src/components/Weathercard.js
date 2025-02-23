import { 
  FaTemperatureHigh, 
  FaTint, 
  FaWind, 
  FaSun, 
  FaMoon,
  FaCloudSun,
  FaUmbrella,
  FaEye
} from 'react-icons/fa';
import { WiSunrise, WiSunset } from 'react-icons/wi';
import './styles/WeatherCard.css';

function WeatherCard({ weather, units }) {
  const current = weather.current;
  const location = weather.location;
  const forecast = weather.forecast.forecastday[0];

  const getUVIndexClass = (uvIndex) => {
    if (uvIndex <= 2) return 'uv-low';
    if (uvIndex <= 5) return 'uv-moderate';
    if (uvIndex <= 7) return 'uv-high';
    if (uvIndex <= 10) return 'uv-very-high';
    return 'uv-extreme';
  };

  const getAQIDescription = (aqi) => {
    const aqiLevel = Math.round(aqi);
    if (aqiLevel <= 50) return { level: 'Good', class: 'aqi-good' };
    if (aqiLevel <= 100) return { level: 'Moderate', class: 'aqi-moderate' };
    if (aqiLevel <= 150) return { level: 'Unhealthy for Sensitive Groups', class: 'aqi-unhealthy-sensitive' };
    if (aqiLevel <= 200) return { level: 'Unhealthy', class: 'aqi-unhealthy' };
    if (aqiLevel <= 300) return { level: 'Very Unhealthy', class: 'aqi-very-unhealthy' };
    return { level: 'Hazardous', class: 'aqi-hazardous' };
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{location.name}</h2>
          <p>{location.region}, {location.country}</p>
          <p className="local-time">{location.localtime}</p>
        </div>
        <div className="current-weather">
          <img 
            src={current.condition.icon} 
            alt={current.condition.text}
            className="weather-icon"
          />
          <p className="condition">{current.condition.text}</p>
        </div>
      </div>

      <div className="weather-info">
        <div className="main-temp">
          <FaTemperatureHigh size={24} />
          <span className="temperature">
            {units === 'metric' ? current.temp_c : current.temp_f}°
            {units === 'metric' ? 'C' : 'F'}
          </span>
          <span className="feels-like">
            Feels like {units === 'metric' ? current.feelslike_c : current.feelslike_f}°
          </span>
        </div>

        <div className="weather-details">
          <div className="detail-group">
            <div className="detail">
              <FaTint size={18} />
              <span>Humidity: {current.humidity}%</span>
            </div>
            <div className="detail">
              <FaWind size={18} />
              <span>
                Wind: {units === 'metric' ? current.wind_kph : current.wind_mph}
                {units === 'metric' ? ' km/h' : ' mph'}
              </span>
            </div>
            <div className="detail">
              <FaEye size={18} />
              <span>Visibility: {units === 'metric' ? current.vis_km : current.vis_miles}
                {units === 'metric' ? ' km' : ' miles'}
              </span>
            </div>
          </div>

          <div className="detail-group">
            <div className={`detail uv-index ${getUVIndexClass(current.uv)}`}>
              <FaSun size={18} />
              <span>UV Index: {current.uv}</span>
            </div>
            {current.air_quality && (
              <div className={`detail aqi ${getAQIDescription(current.air_quality['us-epa-index']).class}`}>
                <span>Air Quality: {getAQIDescription(current.air_quality['us-epa-index']).level}</span>
              </div>
            )}
          </div>

          <div className="sun-times">
            <div className="detail">
              <WiSunrise size={24} />
              <span>Sunrise: {forecast.astro.sunrise}</span>
            </div>
            <div className="detail">
              <WiSunset size={24} />
              <span>Sunset: {forecast.astro.sunset}</span>
            </div>
          </div>
        </div>

        {current.alert && (
          <div className="weather-alert">
            <FaUmbrella size={18} />
            <span>{current.alert}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;