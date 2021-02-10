import React, { useEffect } from 'react';
import styled from 'styled-components';

import { StyledBtn } from '../../components/StyledBtn'

const Text = styled.span`
  padding: .5em;
  display: block;
  
    @media screen and (min-width: 900px) {
        writing-mode: vertical-rl;
        text-orientation: mixed;
    };
`;

function ForecastBtn({ btnState, btnText, btnFunction }) {

    return(
        <>
        {
          btnState
          ? <StyledBtn onClick={() => btnFunction()}><Text>{btnText}</Text></StyledBtn> 
          : <StyledBtn onClick={() => btnFunction()} disabled><Text>{btnText}</Text></StyledBtn> 
        }
        </>
    )
}

export default ForecastBtn;