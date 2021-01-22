import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';

const Section = styled.section`
    width: 400px;
    height: 400px;
    background-color: lightgray;
`;

function DestinationInfo() {
  const [pageData, setPageData] = useState(null);
  
  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY
    });

    bucket.getObjects({
      type: 'destinations',
      props: 'slug,title,content,metadata'
    })
    .then(data => {
      setPageData(data);
      console.log(data);
    })
    .catch(error => {
      console.log(error)
    });

  }, []);


  return (
    <>
      <Section>
        {
            pageData && pageData.objects.map(item => <div dangerouslySetInnerHTML={{__html: item.content}} />)
        }
      </Section>
    </>
  )
};

export default DestinationInfo;