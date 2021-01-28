import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';

import PageTitle from '../../components/PageTitle';
import DestinationInfo from '../../components/DestinationInfo';
import Weather from '../../components/Weather';

let map = null;
let marker = null;
let nav = null;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

function HomeContainer() {

  const [pageData, setPageData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const mapElement = useRef(null);
  const [weather, setWeather] = useState(null);
  

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

  useEffect(() => {

    map = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [ -8.446591991458519, 39.6649438481684 ],
        zoom: 5.5
    })
    .addControl(new Mapbox.NavigationControl(), 'top-left')

  }, []);

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
    
          el.addEventListener('click', () => {

            setDestinationInfo(item);
            setVisualWeather(item);

            map.flyTo({
              center: item.metadata.coordinates,
              zoom: 8,
              speed: 0.7,
              curve: 1
            })
          });

          el.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'green'
          })
          el.addEventListener('mouseout', (e) => {
            e.target.style.backgroundColor = 'black'
          })

          let popup = new Mapbox.Popup()
          popup.setHTML(`${item.metadata.popup_text}`);

          let marker = new Mapbox.Marker(el)
          .setLngLat(item.metadata.coordinates)
          .setPopup(popup)
          marker.addTo(map)

        })
    }
  }, [destinationData]);

  
  function setVisualWeather(item) {
    fetch(`http://api.weatherstack.com/current?access_key=505d9d74c829dd569d0733bcc5408624&query=${item.title}`)
    .then(response => response.json())
    .then(data => {
      setWeather(data)
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    });

    console.log(item);
  };






  return (
    <>
      <PageTitle>Roadtrip Portugal</PageTitle>
      <main>
      {
        (pageData !== null) && <div dangerouslySetInnerHTML={{__html: pageData.content}} />
      }
      <Container>
        <div style={{height: '600px', width: '40vw'}} ref={mapElement} />
        <DestinationInfo destinationInfo={destinationInfo} />
        <Weather weather={weather} />
      </Container>
      </main>
    </>
  )
};

export default HomeContainer;