import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaGlobeAmericas, FaTimes, FaSearch } from 'react-icons/fa';
import './styles/SearchBar.css';

function SearchBar({ onSearch, recentLocations, setRecentLocations }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${search}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    handleSearch(search);
  };

  const handleSearch = (query) => {
    if (query) {
      setLoading(true);
      axios.get(`https://api.weatherapi.com/v1/forecast.json?key=5fd4dddfd9ee4e7e809145827252302&q=${query}&days=7&aqi=yes`)
        .then(response => {
          onSearch(query);
          setError(null);
          setSearch('');
          setShowSuggestions(false);
        })
        .catch(err => {
          console.error("Error fetching data:", err.response ? err.response.data : err.message);
          setError(err.response?.data?.error?.message || "Error fetching data. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const locationName = `${suggestion.name}, ${suggestion.country}`;
    handleSearch(locationName);
    if (!recentLocations.includes(locationName)) {
      const updatedLocations = [...recentLocations, locationName];
      setRecentLocations(updatedLocations);
      localStorage.setItem('recentLocations', JSON.stringify(updatedLocations));
    }
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Search for a city..."
            className="search-input"
          />
          {loading && <div className="search-spinner"></div>}
          
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  <div className="suggestion-info">
                    <FaMapMarkerAlt className="suggestion-icon" />
                    <div className="suggestion-text">
                      <span className="suggestion-name">{suggestion.name}</span>
                      <span className="suggestion-region">
                        {suggestion.region}, {suggestion.country}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="search-button">
          <FaSearch />
          <span>Search</span>
        </button>
      </form>

      {recentLocations.length > 0 && (
        <div className="recent-locations">
          <h3>
            <FaMapMarkerAlt />
            Recent Locations
          </h3>
          <div className="location-buttons">
            {recentLocations.map((location, index) => (
              <div 
                key={index} 
                className="location-button-container"
                title={location}
              >
                <button
                  onClick={() => handleSearch(location)}
                  className="location-button"
                >
                  <FaGlobeAmericas />
                  <span>{location}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newLocations = recentLocations.filter((_, i) => i !== index);
                    setRecentLocations(newLocations);
                    localStorage.setItem('savedLocations', JSON.stringify(newLocations));
                  }}
                  className="remove-location-button"
                  title="Remove location"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="alert">{error}</div>}
    </div>
  );
}

export default SearchBar;