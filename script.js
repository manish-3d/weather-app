const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const weatherContainer = document.getElementById("weatherContainer");
const errorMsg = document.getElementById("error");
const weatherGif = document.getElementById("weatherview");


  width: 100%;
    max-width: 260px;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
    margin-top: 15px;
async function getweather(city) {
    try {const apikey = "4UBY32RPF6BD492E8BW9HHYFC";
    const baseurl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

    // correct template string (BACKTICKS)
    const url = `${baseurl}${city}?unitGroup=metric&key=${apikey}&contentType=json`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
     const weatherCondition = data.currentConditions.conditions;
    getGif(weatherCondition);
    cityName.textContent = data.resolvedAddress;
    temperature.textContent = `Temperature: ${data.currentConditions.temp}  ℃`;
    condition.textContent = `Conditions: ${data.currentConditions.conditions}`;
    humidity.textContent = `Humidity: ${data.currentConditions.humidity}`;

    weatherContainer.classList.remove("hidden");
    errorMsg.classList.add("hidden");
    }
    catch(error){
        weatherContainer.classList.add("hidden");
        errorMsg.classList.remove("hidden");
        console.log("Error : ",error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("form submitted !!");

    const city = cityInput.value.trim();

    getweather(city);

    console.log(city);
});