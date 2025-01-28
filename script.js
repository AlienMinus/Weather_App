async function getWeather() {
  const apiKey = "81dd904c53b2b1ed45e9b69ad5d5a51b";
  const city = document.getElementById("city").value.trim();
  if (!city) {
    document.getElementById("weather-info").innerHTML =
      '<p class="error">Please enter a city name.</p>';
    return;
  }
  const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(
    city
  )}`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    document.getElementById("weather-info").innerHTML = `
                <div class="weather">
                <h2>${data.location.name}, ${data.location.country}.</h2>
                <p>🌡 Temperature: ${data.current.temperature} &#8451;  <br/>
                🏞️Weather: ${data.current.weather_descriptions[0]} <br/>
                💧Humidity: ${data.current.humidity}% <br/>
                💨Wind Speed: ${data.current.wind_speed} km/h <br/>
                🌡Pressure: ${data.current.pressure} hPa <br/>
                👁️Visibility: ${data.current.visibility} km</p>
                </div>
            `;
  } catch (error) {
    document.getElementById(
      "weather-info"
    ).innerHTML = `<p class="error">Error: ${error.message}. Please try again.</p>`;
  }
}
