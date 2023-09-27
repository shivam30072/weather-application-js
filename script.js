const API_KEY = "8f0f1482a20576b9f526e1cbe3f592c3";
//SELECTING ELEMENTS
const input = document.querySelector("input");
const weatherIcon = document.querySelector(".weathericon");
const weatherInfo = document.querySelector(".weather-info");
const temperature = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity-value");
const speed = document.querySelector(".speed-value");
const option = document.querySelector(".options");

let optionValue = "Celsius";
option.addEventListener("click", () => {
  optionValue = option.value;
  if (input.value === "") {
    searchWeather("delhi");
  } else {
    searchWeather();
  }
});

//EVENTS
const search = document.querySelector("button");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

//Getting weather data
const searchWeather = async (value = "") => {
  try {
    if (input.value === "" && value === "") {
      alert("Enter the City");
      return;
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        input.value || value
      }&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    if (data?.cod === "404") {
      alert(data?.message);
    } else {
      displayWeather(data);
    }
  } catch (error) {
    console.log("error occured", error);
    alert("sorry an error occured");
  }
};

function displayWeather(data) {
  let temp;
  if (optionValue === "Celsius") {
    temp = Math.round(data?.main?.temp);
    temperature.innerHTML = `${temp}°C`;
  } else {
    temp = (Math.round(data?.main?.temp) * 9) / 5 + 32;
    temperature.innerHTML = `${temp}°F`;
  }
  cityName.innerHTML = data?.name;
  humidity.innerHTML = data?.main?.humidity + "%";
  speed.innerHTML = data?.wind?.speed + " km/h";
  weatherIcon.src = `/images/${data.weather[0].main}.png`;
  weatherInfo.innerHTML = data?.weather[0]?.description + "!";
}

search.addEventListener("click", searchWeather);

searchWeather("delhi");
