let apiKey = "3dc2b382557a468e26bf3b93993c9bb5";

document.getElementById("search").addEventListener("click", () => {
    displayWeather();
    clearUI();
});

async function displayWeather() {
          
    const cityName = document.getElementById("city").value;
    const city = await getWeather(cityName);           
    addWeatherUI(city);
}

async function getWeather(city) {
    try {
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (response.status ===404)  {        
            messageUI(`${city} Doesn't Exist`);                                      
            return;
        }         
        return await response.json();
        } catch (e) {            
            messageUI("Bad Connection! Try Again");        
        }
}

function addWeatherUI(weather) {
    const weatherList = document.getElementById('weather-container');
    const element = document.createElement("div");
    element.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"> 
        <br> 
        <strong class="otros"> id: </strong> ${weather.id}
        <br> 
        <strong> name: </strong> ${weather.name}
        <br>   
        <strong> feels like: </strong> ${ Math.round(weather.main.feels_like - 273.15)}
        <br> 
        <strong> temp: </strong> ${Math.round(weather.main.temp - 273.15)}
        <br>   
        <strong> temp max: </strong> ${Math.round(weather.main.temp_max - 273.15)}
        <br>
        <strong> temp min: </strong> ${Math.round(weather.main.temp_min - 273.15)}
        <br>        
        <strong> description: </strong> ${weather.weather[0].description}
        <br>    
       
        `;
    weatherList.appendChild(element);
}

function clearUI() {
    document.getElementById("message").innerHTML = "";
    document.getElementById("weather-container").innerHTML = "";
    document.getElementById("city").value = "";
}

function messageUI(message) { 
    const mes = document.getElementById('message');
    const element = document.createElement("div");    
    element.innerHTML = `<h3> ${message} </h3>`; 
    mes.appendChild(element);    
}   