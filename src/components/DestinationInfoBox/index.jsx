import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle';

const Section = styled.section`
    padding: 1em;
    background-color: gray;
    overflow: scroll;
`;

function DestinationInfoBox(props) {

  return (
    <>
      <Section>
        {
          props.destinationInfo && <SecondaryTitle key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.metadata.subhead}} />
        }
        {
          props.destinationInfo && <div key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.content}} />
        }
      </Section>
    </>
  )
};

export default DestinationInfoBox;