import React, { useState, useEffect } from 'react';
import GlobalStyle from './components/GlobalStyle';
import HomeContainer from './containers/HomeContainer';
import Cosmic from 'cosmicjs';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from 'react-router-dom';

function App() {

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
      <GlobalStyle />
      <HomeContainer />
    </>
  )
};

export default App;