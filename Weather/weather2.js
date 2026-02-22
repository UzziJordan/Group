    const API_KEY = "3cb144aa1420444aa2f194122261802";

    const states = [
      "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
      "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo",
      "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
      "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers",
      "Sokoto","Taraba","Yobe","Zamfara"
    ];

    const grid = document.getElementById("weatherGrid");
    const button = document.getElementById("loadBtn");

    function loadWeather() {
        grid.innerHTML = "";
        button.disabled = true;
        button.textContent = "Loading...";


    states.forEach((state, index) => {
      setTimeout(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${state},Nigeria`)
          .then(res => res.json())
          .then(data => {
            if (data.error) throw new Error();

            const card = document.createElement("div");
            card.className =
              "bg-white rounded-xl p-4 shadow-md transition-transform duration-200 hover:-translate-y-1";

            card.innerHTML = `
              <div class="font-bold text-lg mb-1">${state}</div>
              <div class="text-3xl text-[#0a3d62] font-semibold">
                ${data.current.temp_c}°C
              </div>
              <div class="text-sm text-gray-600 mt-1">
                ${data.current.condition.text}<br>
                💧 Humidity: ${data.current.humidity}%
              </div>
            `;

            grid.appendChild(card);
          })
          .catch(() => {
            const errorCard = document.createElement("div");
            errorCard.className =
              "bg-white rounded-xl p-4 shadow-md";

            errorCard.innerHTML = `
              <div class="font-bold text-lg">${state}</div>
              <p class="text-sm text-red-500 mt-2">Unable to load data</p>
            `;

            grid.appendChild(errorCard);
          })
          .finally(() => {
            if (index === states.length - 1) {
              button.textContent = "Weather Loaded";
            }
          });
      }, index * 1200); // delay to avoid API rate limit
    });
}

button.addEventListener("click", loadWeather);