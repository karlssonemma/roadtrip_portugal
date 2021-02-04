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
// let markerArray = [];


function HomeContainer() {

  const [pageData, setPageData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const mapElement = useRef(null);
  const [weather, setWeather] = useState(null);
  const [weatherOpen, setWeatherOpen] = useState(false);
  // const [allMarkers, setAllMarkers] = useState(null);
  
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

    let zoomed = false;

    map = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [ -8.446591991458519, 39.6649438481684 ],
        zoom: 5.5
    })
    .addControl(new Mapbox.NavigationControl(), 'top-left')
    
    // .on('zoom', showAttractions);
    // showAttractions();
    // .on('zoomend', () => {

    //   let zoomLevel = map.getZoom();

    //     if (zoomLevel < 7) {
    //       let allMarkers = document.querySelectorAll('.mapboxgl-marker');
    //       for (const marker of allMarkers) {
    //           if(marker.classList.contains('city-markers')) {
    //             marker.remove();
    //           };
    //       };
    //     };
    // })

  }, []);

  function showAttractions() {

    let zoomLevel = map.getZoom();
    
    if (zoomLevel > 7) {

      if (destinationData !== null) {

        destinationData.map(item => {

          let newCityArray = Object.entries(item.metadata.attractions);

            newCityArray.forEach(([key, value]) => {

              let popupDiv = document.createElement('div');
              popupDiv.style.width = 'max-content';
              popupDiv.style.height = '20px';
              popupDiv.style.borderRadius = '5px';
              popupDiv.style.fontFamily = 'Jost, sans-serif';
              popupDiv.innerHTML = `${value.text}`;
              

              let popup = new Mapbox.Popup({ closeButton: false })
                .setDOMContent(popupDiv);

              let citymarker = new Mapbox.Marker()
                .setLngLat(value.coordinates)
                .setPopup(popup)
                citymarker.addTo(map);
                citymarker.getElement().classList.add('city-markers')
            });
        });
      };
    } else {
      console.log('else')
      let allMarkers = document.querySelectorAll('.mapboxgl-marker');
        for (const marker of allMarkers) {
            if(marker.classList.contains('city-markers')) {
              marker.remove();
            };
        };
    };
  };

  // MARKER
  useEffect(() => {

    if(destinationData !== null) {
      console.log(destinationData)

      destinationData.map((item, index) => {        

          let marker = new Mapbox.Marker({ color: 'darkgreen' })
          .setLngLat(item.metadata.coordinates)
          marker.addTo(map)
          marker.getElement().addEventListener('click', () => {
            setDestinationInfo(item);  
            setVisualWeather(item);
            createAttractions(item);

            map.flyTo({
              center: item.metadata.coordinates,
              zoom: 10,
              speed: 0.7,
              curve: 1
            });
          });
        });
    }
  }, [destinationData]);


  function createAttractions(item) {

    let newCityArray = Object.entries(item.metadata.attractions);

      newCityArray.forEach(([key, value]) => {

        let popupDiv = document.createElement('div');
        popupDiv.style.width = 'max-content';
        popupDiv.style.height = '20px';
        popupDiv.style.borderRadius = '5px';
        popupDiv.style.fontFamily = 'Jost, sans-serif';
        popupDiv.innerHTML = `${value.text}`;
        

        let popup = new Mapbox.Popup({ closeButton: false })
          .setDOMContent(popupDiv);

        let citymarker = new Mapbox.Marker()
          .setLngLat(value.coordinates)
          .setPopup(popup)
          citymarker.addTo(map);
          citymarker.getElement().classList.add('city-markers')
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
        <div style={{height: '600px'}} ref={mapElement} />
        <DestinationInfoBox destinationInfo={destinationInfo} />
        
        <ForecastBtn function={toggleWeather} text={'Show forecast'} weather={weather} />
        {
          weatherOpen && renderWeather()
        }
      </GridContainer>
    </>
  )
};

export default HomeContainer;