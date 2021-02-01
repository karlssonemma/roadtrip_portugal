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

function DestinationInfo(props) {

  return (
    <>
      <Section>
        {
          props.destinationInfo && <SecondaryTitle key={props.destinationInfo.slug} dangerouslySetInnerHTML={{__html: props.destinationInfo.metadata.subhead}} />
        }
        {
          props.destinationInfo && <div key={props.destinationInfo.slug} dangerouslySetInnerHTML={{__html: props.destinationInfo.content}} />
        }
      </Section>
    </>
  )
};

export default DestinationInfo;