const statusbar = document.getElementById('statusText')
const states = document.getElementById('stateSelect')
const weatherInfo = document.getElementById('weatherData')
const btn = document.getElementById('loadBtn')

const state = ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]

function getWeather() {
    return new Promise((resolve, reject) => {
        fetch(`https://api.open-meteo.com/`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    reject(data.error.message);
                    return;
                }
                resolve({
                    name: data.location.name,
                    temp: data.current.temp_c,
                    condition: data.current.condition.text,
                    humidity: data.current.humidity,
                    wind: data.current.wind_kph
                });
            })
            .catch(() => reject("Network error: Could not fetch weather"));
    });
}

btn.addEventListener('click', async () => {
    statusbar.textContent = "Fetching weather...";
    weatherInfo.innerHTML = "";
    try {
        const w = await getWeather();
        statusbar.textContent = "Weather loaded";
        weatherInfo.innerHTML = `
            <h2 class="text-lg font-bold">${w.name}</h2>
            <p>🌡 Temperature: ${w.temp}°C</p>
            <p>💧 Humidity: ${w.humidity}%</p>
            <p>💨 Wind: ${w.wind} km/h</p>
            <p>☁ Condition: ${w.condition}</p>
        `;
    } catch (err) {
        statusbar.textContent = err;
        weatherInfo.innerHTML = `<p class="text-red-400">${err}</p>`;
    }
});