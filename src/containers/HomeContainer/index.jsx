import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';

import PageTitle from '../../components/PageTitle';

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
        center: [ 10.751719406297827, 59.913819985741625 ],
        zoom: 11.5
    })
    setMap(MyMap);
  }, [])


  return (
    <>
      <PageTitle>Roadtrip Portugal</PageTitle>
      {
        (pageData !== null) && <div dangerouslySetInnerHTML={{__html: pageData.content}} />
      }
      <div style={{height: '600px', width: '600px'}} ref={mapElement} />
    </>
  )
};

export default HomeContainer;