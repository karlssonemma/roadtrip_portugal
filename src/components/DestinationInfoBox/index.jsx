import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle';
import TapIcon from './img/tap.png';

const Section = styled.section`
    padding: 1em;
    background-color: gray;
    overflow: scroll;
`;

const Icon = styled.img`
  width: 30px;
  margin-right: .5em;
  /* transform: translateY(3px); */
`;

const PreDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AttractionTitle = styled.h3`
  font-weight: 600;
  margin: 0;
`;

function DestinationInfoBox(props) {

  function renderInfo() {

    let attractionArray = [];

    if (props.destinationInfo.metadata.attractions) {
      let newAttractionArray = Object.entries(props.destinationInfo.metadata.attractions);
        newAttractionArray.forEach(([key, value]) => {
          attractionArray.push(value);
      });
    };

    return(
      <>
        <SecondaryTitle key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.title}} />
        <div key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.content}} />
        <div>
          {
            attractionArray && attractionArray.map(item => <p><AttractionTitle>{item.title}</AttractionTitle>{item.text}</p>)
          }
        </div>
      </>
    )
  };

  return (
    <>
      <Section>
        {
          props.destinationInfo ? renderInfo() : <PreDiv><Icon src={TapIcon} /> to travel!</PreDiv>
        }
      </Section>
    </>
  )
};

export default DestinationInfoBox;