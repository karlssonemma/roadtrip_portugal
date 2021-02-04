import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle';
import TapIcon from './img/tap.png';
import Arrow from './img/right-arrow.png';

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

const ArrowIcon = styled.img`
  width: 20px;
  transform: translateY(4px);
  margin-right: .5em;
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
        <section key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.content}} />
        <section>
          {
            attractionArray && attractionArray.map(item => 
              <section>
                <AttractionTitle>
                  <ArrowIcon src={Arrow} alt='' />{item.title}
                </AttractionTitle>{item.text}
              </section>
            )
          }
        </section>
      </>
    )
  };

  return (
    <>

      <Section>
        {
          props.destinationInfo ? renderInfo() : <PreDiv><Icon src={TapIcon} alt='' /> to travel!</PreDiv>
        }
      </Section>
    </>
  )
};

export default DestinationInfoBox;