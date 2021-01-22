import React, { useEffect, useState } from 'react';
import Cosmic from 'cosmicjs';

function HomeContainer() {

  const [pageData, setPageData] = useState(null);
  
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


  return (
    <>
      <h1>Hallo verden!</h1>
      {
        (pageData !== null) && <div dangerouslySetInnerHTML={{__html: pageData.content}} />
      }
    </>
  )
};

export default HomeContainer;