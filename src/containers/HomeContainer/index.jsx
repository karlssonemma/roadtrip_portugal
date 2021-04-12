import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';

import PageTitle from '../../components/PageTitle';
import InfoBox from '../../components/InfoBox';
import WeatherGraph from '../../components/WeatherGraph';
import Btn from '../../components/Btn';
import ForecastBtn from '../../components/ForecastBtn';
import { Overlay } from '../../components/Overlay';
import { GridContainer } from '../../components/GridContainer'
import { StyledBtn } from '../../components/StyledBtn';
import WelcomeScreen from '../../components/WelcomeScreen';

 
let map = null;
// let nav = null;
let newArray = [];


function HomeContainer() {

  const [pageData, setPageData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [attractions, setAttractions] = useState(null);
  const mapElement = useRef(null);

  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  // COSMIC
  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY
    });

    bucket.getObject({
      slug: 'visit-portugal',
      props: 'slug,title,content'
    })
    .then(data => {
      setPageData(data.object);
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
    })
    .catch(error => {
      console.log(error)
    });

  }, []);

  // MAP
  useEffect(() => {

    map = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [ -8.446591991458519, 39.6649438481684 ],
        zoom: 5.5,
        minZoom: 5.5
    })
    .addControl(new Mapbox.NavigationControl(), 'top-left')
    .on('zoom', showHideAttractions)
    map.keyboard.enable();

  }, []);

  // BIG MARKERS
  useEffect(() => {

    if(destinationData !== null) {

      destinationData.map(item => {       

          let marker = new Mapbox.Marker({ 
            color: '#549155', 
            tabIndex: '0',
            ariaLabel: item
          })
          .setLngLat([item.metadata.longitude, item.metadata.latitude])
          marker.addTo(map)
          marker.getElement().tabIndex = 0; 

          marker.getElement().addEventListener('click', () => {
            setDestinationInfo(item);
            fetchWeather(item);

            map.flyTo({
              center: [item.metadata.longitude, item.metadata.latitude],
              zoom: 12.5,
              speed: 1.2,
              curve: 1
            });
          });

          marker.getElement().addEventListener('keydown', (e) => {
    
              if (e.code === 'Space') {
                setDestinationInfo(item);
                fetchWeather(item);

                map.flyTo({
                  center: [item.metadata.longitude, item.metadata.latitude],
                  zoom: 12.5,
                  speed: 1.2,
                  curve: 1
                });
              }
          })

          if (item.metadata.attractions !== null) {
            item.metadata.attractions.forEach(attraction => {
              newArray.push(attraction)
            })
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
        popupDiv.style.height = 'max-content';
        popupDiv.style.borderRadius = '5px';
        popupDiv.style.fontFamily = 'Jost, sans-serif';
        popupDiv.innerHTML =`
        <p><b>${item.name}</b><p>
        <p>${item.phone}</p>
        <p>${item.address}</p>
        `;
        
        let popup = new Mapbox.Popup({ closeButton: false })
          .setDOMContent(popupDiv);

        let citymarker = new Mapbox.Marker()
          .setLngLat([item.longitude, item.latitude])
          .setPopup(popup)
          citymarker.addTo(map);
          citymarker.getElement().classList.add('attractions')
          citymarker.getElement().style.visibility = 'hidden';
          citymarker.getElement().tabIndex = 0; 
      });

    }

  }, [attractions])

  const showHideAttractions = () => {
    let zoomLevel = map.getZoom();
    let attractionMarkers = document.querySelectorAll('.attractions');

    if(zoomLevel < 7) {
      for (const marker of attractionMarkers) {
        marker.style.visibility = 'hidden';
      };
    } else {
      for (const marker of attractionMarkers) {
        marker.style.visibility = 'visible';
      };
    }
  };

  function fetchWeather(item) {

    let date = Math.floor(new Date().getTime() / 1000);    

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${item.metadata.longitude}&lon=${item.metadata.latitude}&units=metric&dt=${date}&appid=${process.env.WEATHER_KEY}`)
    .then(response => response.json())
    .then(data => {
      setWeather(data);
    })
    .catch(error => {
      console.log(error);
    });

  };

  function renderWeather() {
    return(
      <Overlay onClick={toggleWeather}>
        <Btn function={toggleWeather} text={'X'} />
        <WeatherGraph weather={weather} />
      </Overlay>
    )
  };

  function toggleWeather() {
      setWeatherOpen(!weatherOpen);
  };
  
  function zoomOut() {
    map.flyTo({
      center: [ -8.446591991458519, 39.6649438481684 ],
      zoom: 5.5,
      speed: 1.2,
      curve: 1
    });
  };


  return (
    <>
      <WelcomeScreen pageData={pageData} />
      <nav>
        {
          pageData && <PageTitle dangerouslySetInnerHTML={{__html: pageData.title}} />
        }
      </nav>
      <GridContainer>
        <div>
          <div style={{height: '90%', width: 'auto'}} ref={mapElement} />
          <StyledBtn style={{height: '10%'}} onClick={() => zoomOut()}>zoom out</StyledBtn>
        </div>
        <InfoBox destinationInfo={destinationInfo} attractions={attractions} />
        
        <ForecastBtn btnFunction={toggleWeather} btnText={'Show forecast'} btnState={weather} />
        {
          weatherOpen && renderWeather()
        }
      </GridContainer>
    </>
  )
};

export default HomeContainer;