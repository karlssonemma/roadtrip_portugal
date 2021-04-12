import React from 'react';


function FetchWeather({ item }) {

    console.log('i run')

    let date = Math.floor(new Date().getTime() / 1000);    

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${item.metadata.longitude}&lon=${item.metadata.latitude}&units=metric&dt=${date}&appid=${process.env.WEATHER_KEY}`)
    .then(response => response.json())
    .then(data => {
        setWeather(data);
    })
    .catch(error => {
        console.log(error);
    });

}

export default FetchWeather;