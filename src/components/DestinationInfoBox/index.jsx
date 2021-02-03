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

function DestinationInfoBox(props) {

  function renderInfo() {
    return(
      <>
        <SecondaryTitle key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.metadata.subhead}} />
        <div key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.content}} />
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