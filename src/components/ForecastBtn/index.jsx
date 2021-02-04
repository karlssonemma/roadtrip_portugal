import React, { useEffect } from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  background-color: lightgray;
  font-family: 'Jost', sans-serif;

  &:hover {
      background-color: darkgray;
  }
`;

const Text = styled.span`
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: .5em;
  display: block;
  
    @media screen and (min-width: 900px) {
        writing-mode: vertical-rl;
        text-orientation: mixed;
    };
`;

function ForecastBtn(props) {

    return(
        <>
        {
          props.weather 
          ? <Btn onClick={() => props.function()}><Text>{props.text}</Text></Btn> 
          : <Btn onClick={() => props.function()} disabled><Text>{props.text}</Text></Btn> 
        }
        </>
    )
}

export default ForecastBtn;