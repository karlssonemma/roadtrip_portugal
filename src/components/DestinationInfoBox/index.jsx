import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle';
import TapIcon from './img/tap.png';
import Arrow from './img/right-arrow.png';

const Section = styled.section`
    padding: 1.4em;
    background-color: gray;
    overflow: scroll;
`;

const Icon = styled.img`
  width: 30px;
  margin-right: .5em;
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

const AttractionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AttractionsHead = styled.h3`
  margin: .2em 0;
  text-decoration: underline;
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

function DestinationInfoBox({ destinationInfo }) {

  function renderInfo() {

    let attractionArray = [];

    if (destinationInfo.metadata.attractions) {
      destinationInfo.metadata.attractions.forEach(attraction => {
        attractionArray.push(attraction);
      });
    };

    return(
      <>
        <SecondaryTitle key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: destinationInfo.title}} />
          {
            (destinationInfo.metadata.location_image && destinationInfo.metadata.location_image.url !== null) && <Image src={destinationInfo.metadata.location_image.url} alt={'Photo of ' + destinationInfo.title} />
          }
        <section key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: destinationInfo.content}} />
          {
            destinationInfo && <AttractionsHead>{destinationInfo.metadata.attractions_header}</AttractionsHead>
          }
        <AttractionList>
          {
            attractionArray && attractionArray.map(item => 
              <li key={Math.floor(Math.random() * 1000)}>
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
          destinationInfo ? renderInfo() : <PreDiv><Icon src={TapIcon} alt='' /> to travel!</PreDiv>
        }
      </Section>
    </>
  )
};

export default DestinationInfoBox;