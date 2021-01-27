import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';

const Section = styled.section`
    width: 40vw;
    height: 600px;
    background-color: lightgray;
`;

function DestinationInfo(props) {

  return (
    <>
      <Section>
        {
          props.destinationInfo && <div key={props.destinationInfo.slug} dangerouslySetInnerHTML={{__html: props.destinationInfo.content}} />
        }
      </Section>
    </>
  )
};

export default DestinationInfo;