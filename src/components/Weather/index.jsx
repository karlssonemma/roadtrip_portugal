import React from 'react';

function Weather(props) {
    return(
        <>
            {
                props.weather && 
                <div>
                    <p>{props.weather.current.temperature}</p>
                    <img src={props.weather.current.weather_icons} />
                </div>
            }
        </>
    )
}

export default Weather;