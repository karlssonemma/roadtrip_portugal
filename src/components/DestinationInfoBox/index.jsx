import React, { useEffect, useState, useRef } from 'react';
import Cosmic from 'cosmicjs';
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

const AttractionsHead = styled.h3`
  margin: .2em 0;
  text-decoration: underline;
`;

const AttractionName = styled.h4`
  font-weight: 600;
  margin: 0;
`;

function DestinationInfoBox(props) {

  function renderInfo() {

    let attractionArray = [];

    if (props.destinationInfo.metadata.attractions) {
      props.destinationInfo.metadata.attractions.forEach(attraction => {
        attractionArray.push(attraction);
      });
    };

    return(
      <>
        <SecondaryTitle key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.title}} />
        <section key={Math.floor(Math.random() * 1000)} dangerouslySetInnerHTML={{__html: props.destinationInfo.content}} />
        <section>
          {
            props.destinationInfo && <AttractionsHead>{props.destinationInfo.metadata.attractions_header}</AttractionsHead>
          }
          {
            attractionArray && attractionArray.map(item => 
              <section>
                <AttractionName>
                  <ArrowIcon src={Arrow} alt='' />{item.name}
                </AttractionName>{item.text}
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