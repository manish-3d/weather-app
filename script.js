const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const weatherContainer = document.getElementById("weatherContainer");
const errorMsg = document.getElementById("error");
const weatherGif = document.getElementById("weatherview");


 //function to get the giphy 
 async function getGif(conditionText) {

    const giphyKey = "zZVqkr7saaX4GahvOo9JlM4VlUaETDsI";

    // convert to simple keyword (important!)
    let keyword = conditionText.toLowerCase();

    if (keyword.includes("rain")) keyword = "rain";
    else if (keyword.includes("cloud")) keyword = "cloudy weather";
    else if (keyword.includes("snow")) keyword = "snow weather";
    else if (keyword.includes("clear")) keyword = "sunny weather";
    else keyword = "weather";

    const gifURL = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${keyword}`;

    try {
        const response = await fetch(gifURL);
        if(!response.ok){
            throw new Error("not avilable");
            
        }
        const gifData = await response.json();

        const imageUrl = gifData.data.images.original.url;

        weatherGif.src = imageUrl;
        weatherGif.classList.remove("hidden");

    } catch (error) {
        console.log("GIF error:", error);
    }
}
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