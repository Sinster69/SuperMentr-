async function fetchWeather(query) {
    const status = document.getElementById("status");
    const weatherDiv = document.getElementById("weather");

    status.textContent = "⏳ Loading...";
    weatherDiv.innerHTML = "";

    try {
        const response = await fetch(`https://wttr.in/${query}?format=j1`);

        if (!response.ok) throw new Error();

        const data = await response.json();

        const temp = data.current_condition[0].temp_C;
        const feels = data.current_condition[0].FeelsLikeC;
        const desc = data.current_condition[0].weatherDesc[0].value;
        const humidity = data.current_condition[0].humidity;

        status.textContent = "";

        weatherDiv.innerHTML = `
            <h2>${query}</h2>
            <h1>${temp}°C</h1>
            <p>${desc}</p>
            <p>Feels like: ${feels}°C</p>
            <p>Humidity: ${humidity}%</p>
        `;
    } catch (error) {
        status.textContent = "❌ Error fetching weather!";
    }
}

// Search by city
function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        document.getElementById("status").textContent = "Enter a city!";
        return;
    }
    fetchWeather(city);
}

// Auto location
function getLocationWeather() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetchWeather(`${lat},${lon}`);
    });
}