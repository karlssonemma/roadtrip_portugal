import React from 'react';

export async function FetchWeather(item, date) {  

    return fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${item.metadata.longitude}&lon=${item.metadata.latitude}&units=metric&dt=${date}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });
}