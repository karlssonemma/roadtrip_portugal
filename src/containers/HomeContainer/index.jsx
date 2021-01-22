import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';

import PageTitle from '../../components/PageTitle';
import DestinationInfo from '../../components/DestinationInfo';

function HomeContainer() {
  let MyMap;
  const [map, setMap] = useState(null);
  const [pageData, setPageData] = useState(null);
  const mapElement = useRef(null);
  
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

  }, []);

  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  useEffect(() => {
    MyMap = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [ -8.446591991458519, 39.6649438481684 ],
    })

    let Porto = new Mapbox.Marker()
        .setLngLat([-8.627351460272976, 41.167260591676104])
        .addTo(MyMap);

    let Lisbon = new Mapbox.Marker()
        .setLngLat([-9.140292667419706, 38.727805168203666])
        .addTo(MyMap);

    let Faro = new Mapbox.Marker()
        .setLngLat([-7.923578084253709, 37.0822677353351])
        .addTo(MyMap);

    setMap(MyMap);

  }, []);



  return (
    <>
      <PageTitle>Roadtrip Portugal</PageTitle>
      <main>
      {
        (pageData !== null) && <div dangerouslySetInnerHTML={{__html: pageData.content}} />
      }
      <div style={{height: '500px'}} ref={mapElement} />
      <DestinationInfo />
      </main>
    </>
  )
};

export default HomeContainer;