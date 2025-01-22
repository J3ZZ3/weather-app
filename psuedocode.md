// Step 1: Setup
Initialize React app
Install dependencies: axios (for API requests), react-router-dom (for routing), and a state management library (optional)

// Step 2: Define Components
Define the following React components:
- Navbar
- SearchBar
- Suggestions
- RecentLocations
- LoadingOrErrorMessage
- WeatherCard
- ForecastSection
- ForecastCard

// Step 3: Navbar Component
Navbar Component:
  Display:
    - [Weather App] link to the homepage
    - [Home] link to the homepage
    - [Settings] link to the settings page

// Step 4: SearchBar Component
SearchBar Component:
  State:
    - searchQuery (user input)
    - suggestions (list of suggested cities)
    - loading (boolean for spinner)
  Methods:
    - handleSearchInput: update searchQuery state
    - fetchSuggestions: fetch city suggestions based on searchQuery
  Render:
    - Input field for searchQuery
    - Spinner if loading
    - List of city suggestions

// Step 5: Suggestions Component
Suggestions Component:
  Props:
    - suggestions (list of cities)
  Render:
    - Display each suggestion as a clickable item

// Step 6: RecentLocations Component
RecentLocations Component:
  State:
    - recentLocations (list of cities with weather data)
  Methods:
    - removeLocation: remove a location from recentLocations
  Render:
    - Display list of recent locations
    - Each location includes a "Remove" button

// Step 7: LoadingOrErrorMessage Component
LoadingOrErrorMessage Component:
  Props:
    - loading (boolean)
    - errorMessage (string)
  Render:
    - If loading, display "Loading weather data..."
    - If errorMessage is present, display errorMessage

// Step 8: WeatherCard Component
WeatherCard Component:
  Props:
    - locationName (string)
    - weatherIcon (URL or icon name)
    - temperature (number)
    - conditionText (string)
    - humidity (number)
    - windSpeed (number)
  Render:
    - Location name
    - Weather icon
    - Temperature with °C/°F toggle
    - Weather condition text
    - Humidity and wind speed

// Step 9: ForecastSection Component
ForecastSection Component:
  State:
    - hourlyForecast (list of weather data for the next 24 hours)
    - weeklyForecast (list of weather data for the next 7 days)
  Render:
    - Hourly forecast with ForecastCard components
    - Weekly forecast with ForecastCard components

// Step 10: ForecastCard Component
ForecastCard Component:
  Props:
    - time (string or date)
    - weatherIcon (URL or icon name)
    - temperature (number)
  Render:
    - Time
    - Weather icon
    - Temperature

// Step 11: API Integration
Fetch current weather data:
  API Endpoint: /current-weather?city={cityName}
  Update WeatherCard component with data
Fetch hourly and weekly forecast:
  API Endpoint: /forecast?city={cityName}
  Update ForecastSection component with data

// Step 12: Routing
Define routes using react-router-dom:
  - "/" for the homepage
  - "/settings" for settings page

// Step 13: Settings Page
Settings Component:
  State:
    - units (°C or °F)
  Methods:
    - toggleUnits: toggle between °C and °F
  Render:
    - Option to switch temperature units

// Step 14: State Management
Global State (using context or Redux):
  - recentLocations
  - currentWeather
  - forecastData
  - loading and error states

// Step 15: Final Integration
Combine components in App.js:
  <Navbar />
  <SearchBar />
  <Suggestions />
  <RecentLocations />
  <LoadingOrErrorMessage />
  <WeatherCard />
  <ForecastSection />

// Step 16: Offline and Performance Optimization
Add service workers for offline functionality
Implement memoization to optimize re-renders
Preload commonly used assets like weather icons

// Step 17: Testing and Debugging
Use testing tools like Jest and React Testing Library
Test all functionalities: search, API requests, and error handling
