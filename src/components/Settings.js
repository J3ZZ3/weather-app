import './styles/Settings.css';

function Settings({ units, setUnits, theme, setTheme }) {
    return (
      <div className="settings">
        <h2>Settings</h2>
        
        <div className="settings-section">
          <h3>Temperature Units</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="units"
                value="metric"
                checked={units === 'metric'}
                onChange={(e) => setUnits(e.target.value)}
              />
              Celsius (°C)
            </label>
            <label>
              <input
                type="radio"
                name="units"
                value="imperial"
                checked={units === 'imperial'}
                onChange={(e) => setUnits(e.target.value)}
              />
              Fahrenheit (°F)
            </label>
          </div>
        </div>
  
        <div className="settings-section">
          <h3>Theme</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => setTheme(e.target.value)}
              />
              Light
            </label>
            <label>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.value)}
              />
              Dark
            </label>
          </div>
        </div>
      </div>
    );
  }
  
  export default Settings;