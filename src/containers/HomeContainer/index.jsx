import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';
// import { el } from '../../components/Marker';

import PageTitle from '../../components/PageTitle';
import DestinationInfo from '../../components/DestinationInfo';
import Weather from '../../components/Weather';
import Button from '../../components/Button';
import { Overlay } from '../../components/Overlay';
import { GridContainer } from '../../components/GridContainer'
 
let map = null;
let marker = null;
let nav = null;


function HomeContainer() {

  const [pageData, setPageData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const mapElement = useRef(null);
  const [weather, setWeather] = useState(null);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [cities, setCities] = useState([]);
  
  // COSMIC
  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY
    });

    bucket.getObject({
      slug: 'home',
      props: 'slug,title,content'
    })
    .then(data => {
      setPageData(data.object);
      console.log(data);
    })
    .catch(error => {
      console.log(error)
    });

    bucket.getObjects({
      type: 'destinations',
      props: 'slug,title,content,metadata'
    })
    .then(data => {
      setDestinationData(data.objects);
      console.log(data.objects);
    })
    .catch(error => {
      console.log(error)
    });

  }, []);

  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  // MAP
  useEffect(() => {

    map = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [ -8.446591991458519, 39.6649438481684 ],
        zoom: 5.5
    })
    .addControl(new Mapbox.NavigationControl(), 'top-left')

  }, []);

  // MARKER
  useEffect(() => {

    if(destinationData !== null) {

      destinationData.map(item => {
          let el = document.createElement('div');
          el.style.display = 'block';
          el.style.height = '30px';
          el.style.width = '30px';
          el.style.backgroundColor = 'black';
          el.style.opacity = '30%';
          el.style.borderRadius = '50%';

          el.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'green'
          })
          el.addEventListener('mouseout', (e) => {
            e.target.style.backgroundColor = 'black'
          })
    
          el.addEventListener('click', (e) => {

            e.target.style.opacity = 0;
            setDestinationInfo(item);
            setVisualWeather(item);
            createAttractions(item);

            map.flyTo({
              center: item.metadata.coordinates,
              zoom: 10,
              speed: 0.7,
              curve: 1
            })

          });


          let marker = new Mapbox.Marker(el)
          .setLngLat(item.metadata.coordinates)
          marker.addTo(map)

        })
    }
  }, [destinationData]);


  function createAttractions(item) {

    let newCityArray = Object.entries(item.metadata.attractions);

      newCityArray.forEach(([key, value]) => {

        let popup = new Mapbox.Popup()
        popup.setHTML(`${value.popup_text}`);

        let citymarker = new Mapbox.Marker()
        .setLngLat(value.coordinates)
        .setPopup(popup)
        citymarker.addTo(map);

      });
  };

  function setVisualWeather(item) {

    let date = Math.floor(new Date().getTime() / 1000);
    console.log(date);
    

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${item.metadata.coordinates[0]}&lon=${item.metadata.coordinates[1]}&units=metric&dt=${date}&appid=aabfc74bd8d38f4cc57234aafe936811`)
    .then(response => response.json())
    .then(data => {
      setWeather(data);
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

    console.log(item);
  };

  function showWeather() {
    return(
      <Overlay>
        <Button function={toggleWeather} text={'X'} />
        <div>
          <Weather weather={weather} />
        </div>
      </Overlay>
    )
  };

  function toggleWeather() {
      setWeatherOpen(!weatherOpen);
  };



  return (
    <>
      <PageTitle>ROADTRIP PORTUGAL</PageTitle>
      <main>
      {
        (pageData !== null) && <div dangerouslySetInnerHTML={{__html: pageData.content}} />
      }
      <GridContainer>
        <div style={{height: '600px'}} ref={mapElement} />
        <DestinationInfo destinationInfo={destinationInfo} />
        {
          weather && <Button function={toggleWeather} text={'Show forecast'} />
        }
        {
          weatherOpen && showWeather()
        }
      </GridContainer>
      </main>
    </>
  )
};

export default HomeContainer;