import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle';
import Tap from './img/tap.png';
import Arrow from './img/right-arrow.png';

const Section = styled.section`
    padding: 1.4em;
    background-color: gray;
    overflow: scroll;
`;

const TapIcon = styled.img`
  width: 30px;
  margin-right: .5em;
`;

const ArrowIcon = styled.img`
  width: 20px;
  transform: translateY(4px);
  margin-right: .5em;
`;

const TapToTravel = styled.p`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AttractionsHead = styled.h3`
  margin: .2em 0;
  text-decoration: underline;
`;

const AttractionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AttractionName = styled.h4`
  font-weight: 600;
  margin: 0;
`;
const AttractionText = styled.p`
  margin: 0;
`;

const Image = styled.img`
  width: 100%;
`;



function InfoBox({ destinationInfo }) {

 
  function renderInfo() {

    let attractionArray = [];

    if (destinationInfo.metadata.attractions) {
      destinationInfo.metadata.attractions.forEach(attraction => {
        attractionArray.push(attraction);
      });
    };

    return(
      <>
        <SecondaryTitle dangerouslySetInnerHTML={{__html: destinationInfo.title}} />
          {
            (destinationInfo.metadata.location_image && destinationInfo.metadata.location_image.url !== null) 
              && <Image src={destinationInfo.metadata.location_image.url} alt={'Photo of ' + destinationInfo.title} />
          }
        <section dangerouslySetInnerHTML={{__html: destinationInfo.content}} />
          {
            destinationInfo && <AttractionsHead>{destinationInfo.metadata.attractions_header}</AttractionsHead>
          }
        <AttractionList>
          {
            attractionArray && attractionArray.map(item => 
              <li key={item.name}>
                <AttractionName>
                  <ArrowIcon src={Arrow} alt='' />{item.name}
                </AttractionName>
                <AttractionText>{item.text}</AttractionText>
              </li>
            )
          }
        </AttractionList>
      </>
    )
  };

  return (
    <>
      <Section tabIndex='0'>
        {
          destinationInfo ? renderInfo() : <TapToTravel><TapIcon src={Tap} alt='' /> to travel!</TapToTravel>
        }
      </Section>
    </>
  )
};

export default InfoBox;