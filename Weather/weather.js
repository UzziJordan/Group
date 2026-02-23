const loadBtn = document.getElementById("loadBtn");
const statusText = document.getElementById("statusText");
const weatherData = document.getElementById("weatherData");
const stateSelect = document.getElementById("stateSelect");

// Replace with your actual WeatherAPI.com key
  const API_KEY = "3cb144aa1420444aa2f194122261802";

function fetchWeather() {
    return new Promise((done, issue) => {
        const state = stateSelect.value.trim();
        if (!state) {
            issue("Please select a state");
            return;
        }

        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${state}`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                issue(data.error.message);
                return;
            }

            done({
                name: data.location.name,
                temp: data.current.temp_c,
                condition: data.current.condition.text,
                humidity: data.current.humidity,
                wind: data.current.wind_kph
            });
        })
        .catch(() => issue("Network error: Could not fetch weather"));
    });
}

loadBtn.addEventListener("click", async () => {
    statusText.textContent = "Fetching weather...";
    weatherData.innerHTML = "";

    try {
        const w = await fetchWeather();
        statusText.textContent = "Weather loaded";

        weatherData.innerHTML = `
            <h2 class="text-lg font-bold">${w.name}</h2>
            <p>🌡 Temperature: ${w.temp}°C</p>
            <p>💧 Humidity: ${w.humidity}%</p>
            <p>💨 Wind: ${w.wind} km/h</p>
            <p>☁ Condition: ${w.condition}</p>
        `;
    } catch (err) {
        statusText.textContent = err;
        weatherData.innerHTML = `<p class="text-red-400">${err}</p>`;
    }
});