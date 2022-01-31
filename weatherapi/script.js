const btn = document.querySelector("button");
const KEY = 'ee9d0bc254384c0fb84273dee9af6414';


btn.addEventListener( 'click', function(){
    const input = document.querySelector('input');
    console.log(input.value);
    document.getElementById("error-message").innerHTML = "";

     

    const url = `https://api.weatherbit.io/v2.0/current?key=${KEY}&lang=se&city=${input.value}`;
    const forecast = `https://api.weatherbit.io/v2.0/forecast/daily?city=${input.value}&key=${KEY}`;
    
fetch(url).then(
    function(response){
        console.log(response);
        if(response.status>=200 && response.status<300){
            return response.json();
        }
        else{
            throw 'Something went wrong.';
        }
    }
).then(
    function(response){
        console.log(response);
        const data = response.data[0];
        displayCurrentWeather(data);

       
        
    }
).catch(
    function(error){
        console.log(error);
        document.getElementById("error-message").innerHTML = "Något gick fel kontrollera din stavning."
    }
);
fetch(forecast).then(
    function(response){
        console.log(response);
        if(response.status>=200 && response.status<300){
            return response.json();
        }
        else{
            throw 'Something went wrong.';
        }
    }
).then(
    function(response){
        console.log(response);
        const data = response.data;
        displayForecastWeather(data);
    }
).catch(
    function(error){
        console.log(error);
        document.getElementById("error-message").innerHTML = "Något gick fel kontrollera din stavning."
    }
);
});

function displayCurrentWeather(data){
    document.getElementById("current-temp").innerHTML = `Temperaturen är: ${Math.round(data.temp)}\u00B0`;
    document.getElementById("current-wind").innerHTML = `Vindhastigheten är: ${Math.round(data.wind_spd)}m/s`;
    document.getElementById("current-humidity").innerHTML = `Luftfuktigheten är: ${Math.round(data.rh)}%`;
    document.getElementById("current-weather-img").src = `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`;
}

function displayForecastWeather(data) {
    for (let index = 1; index < 6; index++) {
        const forecastID = document.getElementById(`forecast-${index}`) 
        forecastID.src = `https://www.weatherbit.io/static/img/icons/${data[index].weather.icon}.png`;
        forecastID.nextElementSibling.innerHTML = `Temperaturen är: ${Math.round(data[index].temp)}\u00B0`;
        forecastID.nextElementSibling.nextElementSibling.innerHTML = `Datum: ${data[index].datetime}`;

    }
}




