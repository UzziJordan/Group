const loadBtn = document.getElementById("loadBtn");
const statusText = document.getElementById("statusText");
const weatherData = document.getElementById("weatherData");
const stateSelect = document.getElementById("stateSelect");

// Replace with your actual WeatherAPI.com key
const API_KEY = "3cb144aa1420444aa2f194122261802";

async function fetchWeather() {
  const state = stateSelect.value.trim();
  if (!state) {
    throw new Error("Please select a state");
  }

  const query = encodeURIComponent(`${state},Nigeria`);
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data?.error?.message || `API error (${res.status})`);
  }

  return {
    name: data.location.name,
    temp: data.current.temp_c,
    condition: data.current.condition.text,
    humidity: data.current.humidity,
    wind: data.current.wind_kph
  };
}

loadBtn.addEventListener("click", async () => {
  statusText.textContent = "Fetching weather...";
  weatherData.innerHTML = "";

  try {
    const w = await fetchWeather();
    statusText.textContent = "Weather loaded";

    weatherData.innerHTML = `
      <h2 class="text-lg font-bold">${w.name}</h2>
      <p>Temperature: ${w.temp}°C</p>
      <p>Humidity: ${w.humidity}%</p>
      <p>Wind: ${w.wind} km/h</p>
      <p>Condition: ${w.condition}</p>
    `;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not load weather";
    statusText.textContent = message;
    weatherData.innerHTML = `<p class="text-red-400">${message}</p>`;
  }
});
