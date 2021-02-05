import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';
// import { el } from '../../components/Marker';

import PageTitle from '../../components/PageTitle';
import DestinationInfoBox from '../../components/DestinationInfoBox';
import Weather from '../../components/Weather';
import Button from '../../components/Button';
import ForecastBtn from '../../components/ForecastBtn';
import { Overlay } from '../../components/Overlay';
import { GridContainer } from '../../components/GridContainer'
import WelcomeScreen from '../../components/WelcomeScreen';

 
let map = null;
let nav = null;
let newArray = [];
// let markerArray = [];


function HomeContainer() {

  const [pageData, setPageData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const mapElement = useRef(null);
  const [weather, setWeather] = useState(null);
  const [weatherOpen, setWeatherOpen] = useState(false);
  // const [allMarkers, setAllMarkers] = useState(null);
  const [attractions, setAttractions] = useState(null);
  
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
    
    .on('zoom', showHideAttractions);

  }, []);

  // BIG MARKERS
  useEffect(() => {

    if(destinationData !== null) {
      console.log(destinationData)

      destinationData.map(item => {       

          let marker = new Mapbox.Marker({ color: 'black' })
          .setLngLat([item.metadata.longitude, item.metadata.latitude])
          marker.addTo(map)
          marker.getElement().addEventListener('click', () => {
            setDestinationInfo(item);  
            setVisualWeather(item);

            map.flyTo({
              center: [item.metadata.longitude, item.metadata.latitude],
              zoom: 12.5,
              speed: 0.7,
              curve: 1
            });
          });

          if (item.metadata.attractions !== null) {
            
            let attractionsArray = Object.entries(item.metadata.attractions);

              attractionsArray.forEach(([key, value]) => {
                if (value.title !== "")
                  newArray.push(value);             
              });

          };
        });
      setAttractions(newArray);
    }
  }, [destinationData]);

  // SMALL MARKERS
  useEffect(() => {
    if (attractions !== null) {
      attractions.map(item => {
        let popupDiv = document.createElement('div');
        popupDiv.style.width = 'max-content';
        popupDiv.style.height = '20px';
        popupDiv.style.borderRadius = '5px';
        popupDiv.style.fontFamily = 'Jost, sans-serif';
        popupDiv.innerHTML = `${item.title}`;
        
        let popup = new Mapbox.Popup({ closeButton: false })
          .setDOMContent(popupDiv);

        let citymarker = new Mapbox.Marker()
          .setLngLat([item.longitude, item.latitude])
          .setPopup(popup)
          citymarker.addTo(map);
          citymarker.getElement().classList.add('city-markers')
          citymarker.getElement().style.visibility = 'hidden';
      });
    }
  }, [attractions])

  const showHideAttractions = () => {
    let zoomLevel = map.getZoom();
    let cityMarkers = document.querySelectorAll('.city-markers');

    if(zoomLevel < 7) {
      for (const marker of cityMarkers) {
        marker.style.visibility = 'hidden';
      };
    } else {
      for (const marker of cityMarkers) {
        marker.style.visibility = 'visible';
      };
    }
  };

  function setVisualWeather(item) {

    let date = Math.floor(new Date().getTime() / 1000);
    console.log(date);
    

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${item.metadata.longitude}&lon=${item.metadata.latitude}&units=metric&dt=${date}&appid=aabfc74bd8d38f4cc57234aafe936811`)
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

  function renderWeather() {
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
      <WelcomeScreen />
      <nav>
        <PageTitle>ROADTRIP PORTUGAL</PageTitle>
      </nav>
      <GridContainer>
        <div style={{height: '550px'}} ref={mapElement} />
        <DestinationInfoBox destinationInfo={destinationInfo} attractions={attractions} />
        
        <ForecastBtn function={toggleWeather} text={'Show forecast'} weather={weather} />
        {
          weatherOpen && renderWeather()
        }
      </GridContainer>
    </>
  )
};

export default HomeContainer;