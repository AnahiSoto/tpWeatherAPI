const apiKey = "3dc2b382557a468e26bf3b93993c9bb5";
let weatherArray = [];
let weatherNowArray = [];

document.getElementById("search").addEventListener("click", () => {
    displayWeather();
    clearUI();
});

document.getElementById("compare").addEventListener("click", () => {
    compareTemps(weatherNowArray);
});

document.getElementById("history").addEventListener("click", () => {
    weatherHistory(weatherArray);
});

document.getElementById("clear").addEventListener("click", () => {
    clearUI();
});

async function displayWeather() {          
    const cityName = document.getElementById("city").value;

    if (cityName === "" || cityName === undefined) {
        alert("Ingresa la ciudad");     
        return;
    } else {        
        const countryCode = document.getElementById("countries").value;                                
        const city = await getWeather(cityName, countryCode);    
        const city2 = await getWeatherNow(cityName);           
        weatherNowArray.push(city2);               
        addWeatherUI(city);
        //console.log(city);
        addWeatherUINow(city2);
        weatherArray.push(city);   
        //console.log(city2);
    }
}